import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

type ProposalOutput = {
  opener: string;
  proposal: string;
  cta: string;
  questions: string[];
};

export async function POST(req: NextRequest) {
  try {
    // 1. Initialize Supabase client
    const supabase = await createClient();

    // 2. Get active user session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to generate proposals." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { jobPost, skills, platform, tone } = body;

    if (!jobPost || !skills || !platform || !tone) {
      return NextResponse.json(
        { error: "Missing required fields: jobPost, skills, platform, and tone are all required." },
        { status: 400 }
      );
    }

    // 3. Enforce user credit limits
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error("Error loading user profile:", profileError);
      return NextResponse.json(
        { error: "Could not retrieve user account settings." },
        { status: 500 }
      );
    }

    if (profile.credits <= 0) {
      return NextResponse.json(
        { error: "You have 0 proposal credits remaining. Please buy credit packs or upgrade." },
        { status: 403 }
      );
    }

    const systemPrompt = `You are PitchMint, an expert proposal writer assistant for freelancers.
Generate a tailored freelance proposal based on the parameters provided.
Output MUST be a JSON object with the following keys:
- opener: A short, compelling opening sentence tailored to the job post and tone.
- proposal: The full proposal body outlining the solution, matching skills/experience, keeping the platform structure in mind. Do not include markdown headers inside the proposal body; keep it clean, human-written text.
- cta: A call-to-action closing line tailored to the platform.
- questions: An array of exactly 3 smart client questions to demonstrate expertise and start a conversation.

Ensure the JSON is well-formed. Do not enclose the output in markdown code blocks.`;

    const userPrompt = `Input Parameters:
- Platform: ${platform}
- Tone: ${tone}
- Job Post: ${jobPost}
- Skills/Experience: ${skills}`;

    let result: ProposalOutput | null = null;
    let providerUsed = "";

    // 1. Try Groq (Primary)
    if (process.env.GROQ_API_KEY) {
      try {
        console.log("Attempting generation using Groq API...");
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const textResponse = data.choices?.[0]?.message?.content;
          if (textResponse) {
            result = JSON.parse(textResponse);
            providerUsed = "Groq (Llama-3.3)";
            console.log("Groq API call successful!");
          }
        } else {
          console.error("Groq API returned non-OK status:", response.status, await response.text());
        }
      } catch (err) {
        console.error("Groq API call failed with error:", err);
      }
    }

    // 2. Try Gemini (Fallback)
    if (!result && process.env.GEMINI_API_KEY) {
      try {
        console.log("Attempting generation using Gemini API...");
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: systemPrompt },
                    { text: userPrompt }
                  ],
                },
              ],
              generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: "OBJECT",
                  properties: {
                    opener: { type: "STRING" },
                    proposal: { type: "STRING" },
                    cta: { type: "STRING" },
                    questions: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                    },
                  },
                  required: ["opener", "proposal", "cta", "questions"],
                },
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (textResponse) {
            result = JSON.parse(textResponse);
            providerUsed = "Gemini 2.5 Flash";
            console.log("Gemini API call successful!");
          }
        } else {
          console.error("Gemini API returned non-OK status:", response.status, await response.text());
        }
      } catch (err) {
        console.error("Gemini API call failed with error:", err);
      }
    }

    // If all providers failed or were not configured
    if (!result) {
      return NextResponse.json(
        {
          error: "No AI providers succeeded. Please ensure you have configured GEMINI_API_KEY or GROQ_API_KEY in your environment variables.",
        },
        { status: 503 }
      );
    }

    // 4. Save proposal to database history
    const { error: saveError } = await supabase.from("proposals").insert({
      user_id: user.id,
      job_post: jobPost,
      skills: skills,
      platform: platform,
      tone: tone,
      opener: result.opener,
      proposal: result.proposal,
      cta: result.cta,
      questions: result.questions,
    });

    if (saveError) {
      console.error("Failed to save proposal to history database:", saveError);
    } else {
      console.log("Proposal successfully saved to history!");
    }

    // 5. Deduct 1 credit
    const { error: creditError } = await supabase
      .from("profiles")
      .update({ credits: Math.max(0, profile.credits - 1) })
      .eq("id", user.id);

    if (creditError) {
      console.error("Failed to deduct user credit:", creditError);
    }

    return NextResponse.json({
      data: result,
      provider: providerUsed,
    });
  } catch (error: any) {
    console.error("Internal server error in generate route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message || error },
      { status: 500 }
    );
  }
}
