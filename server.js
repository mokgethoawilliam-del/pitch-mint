import dotenv from "dotenv";
import express from "express";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

app.use(express.json());
app.use(express.static(__dirname));

function cleanList(text) {
  return String(text || "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function summarizeJobPost(text) {
  const compact = String(text || "").replace(/\s+/g, " ").trim();
  if (!compact) return "a well-scoped freelance project";

  const firstSentence = compact.split(/[.!?]/)[0].trim();
  return firstSentence || compact.slice(0, 140);
}

function extractFocus(jobPost) {
  const lowerPost = String(jobPost || "").toLowerCase();

  if (lowerPost.includes("landing page")) return "a landing page that feels sharp and conversion-aware";
  if (lowerPost.includes("website")) return "a website experience that feels modern and easy to navigate";
  if (lowerPost.includes("design")) return "a polished design direction that supports the brief";
  if (lowerPost.includes("copy")) return "messaging that feels clear, useful, and on-brand";
  if (lowerPost.includes("developer") || lowerPost.includes("build")) {
    return "a build process that is reliable, clear, and easy to collaborate on";
  }

  return "an outcome that feels tailored to the client goals";
}

function getSkillHighlight(skills) {
  if (!skills.length) return "relevant freelance experience";
  if (skills.length === 1) return skills[0];
  if (skills.length === 2) return `${skills[0]} and ${skills[1]}`;
  return skills.slice(0, 3).join(", ");
}

function getTimelineLine(jobPost) {
  const lowerPost = String(jobPost || "").toLowerCase();

  if (lowerPost.includes("fast") || lowerPost.includes("quick") || lowerPost.includes("asap")) {
    return "I understand speed matters here, so I would keep the process tight and communication proactive.";
  }

  if (lowerPost.includes("timeline") || lowerPost.includes("deadline")) {
    return "I would make scope and milestones clear early so the timeline stays realistic.";
  }

  return "I would keep the work structured from the start so there is clarity on scope, progress, and next steps.";
}

function makeQuestions(jobPost, platform) {
  const lowerPost = String(jobPost || "").toLowerCase();
  const questions = [];

  if (lowerPost.includes("timeline") || lowerPost.includes("deadline")) {
    questions.push("What deadline or milestone schedule matters most for this project?");
  } else {
    questions.push("What timeline are you targeting for the first deliverable?");
  }

  if (lowerPost.includes("landing page") || lowerPost.includes("design")) {
    questions.push("Do you already have brand assets, wireframes, or reference pages to work from?");
  } else {
    questions.push("Are there existing materials, examples, or workflows you want me to align with?");
  }

  if (platform === "Email Outreach") {
    questions.push("Who is the best contact for follow-up once I send a draft or outline?");
  } else {
    questions.push("What would make this proposal feel like the strongest fit for your needs?");
  }

  return questions;
}

function buildDemoProposal(input) {
  const toneProfiles = {
    Direct: {
      openerLead: "Hi, I can help with this.",
      voice: "clear, efficient, and delivery-focused",
      cta: "If this sounds aligned, I can send a quick outline and next-step plan today."
    },
    Warm: {
      openerLead: "Hi, I would love to help with this project.",
      voice: "collaborative, thoughtful, and easy to work with",
      cta: "If this feels like the right fit, I can share relevant examples and a simple next-step plan."
    },
    Premium: {
      openerLead: "Hello, this is exactly the kind of project I enjoy taking on.",
      voice: "polished, strategic, and tailored to the end result",
      cta: "If you would like, I can follow up with curated examples and a refined approach for execution."
    }
  };

  const platformNotes = {
    Upwork: "This version is shaped like a strong Upwork proposal.",
    Fiverr: "This version is shaped like a concise Fiverr pitch.",
    LinkedIn: "This version is shaped like a professional LinkedIn outreach message.",
    "Email Outreach": "This version is shaped like a polished outreach email."
  };

  const platformClosers = {
    Upwork: "I can also tighten this into an Upwork-ready version if needed.",
    Fiverr: "I can also shorten this into a more buyer-friendly Fiverr format.",
    LinkedIn: "I can also adapt this into a shorter LinkedIn follow-up.",
    "Email Outreach": "I can also format this into a cleaner email version for outreach."
  };

  const skills = cleanList(input.skills);
  const tone = toneProfiles[input.tone] ? input.tone : "Warm";
  const platform = platformNotes[input.platform] ? input.platform : "Upwork";
  const profile = toneProfiles[tone];
  const summary = summarizeJobPost(input.jobPost);
  const focus = extractFocus(input.jobPost);
  const skillHighlight = getSkillHighlight(skills);
  const timelineLine = getTimelineLine(input.jobPost);

  return {
    opener:
      `${profile.openerLead} Based on your brief, it looks like you need help with ` +
      `${summary.charAt(0).toLowerCase()}${summary.slice(1)}, and I can bring a ${profile.voice} approach to that work.`,
    proposal:
      `${platformNotes[platform]} My background in ${skillHighlight} would let me build around ${focus} instead of sending a generic response. ` +
      `${timelineLine} I would focus on delivering something that feels thoughtful, aligned with the brief, and straightforward for you to review.`,
    cta: `${profile.cta} ${platformClosers[platform]}`,
    questions: makeQuestions(input.jobPost, platform)
  };
}

function buildPrompt(input) {
  return `
You are PitchMint, an expert freelance proposal writer.
Return only valid JSON that matches this exact shape:
{
  "opener": "string",
  "proposal": "string",
  "cta": "string",
  "questions": ["string", "string", "string"]
}

Rules:
- Write realistic, tailored proposal content.
- Keep the tone aligned with the requested tone.
- Match the requested platform style.
- Keep the opener concise.
- Keep the proposal to one strong paragraph.
- Keep the CTA short and natural.
- Return exactly 3 thoughtful client questions.
- Do not include markdown.

Inputs:
- Job post: ${input.jobPost}
- Skills: ${cleanList(input.skills).join(", ") || "Not provided"}
- Platform: ${input.platform}
- Tone: ${input.tone}
`.trim();
}

async function generateWithGemini(input) {
  if (!ai) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: buildPrompt(input),
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          opener: { type: "string" },
          proposal: { type: "string" },
          cta: { type: "string" },
          questions: {
            type: "array",
            items: { type: "string" },
            minItems: 3,
            maxItems: 3
          }
        },
        required: ["opener", "proposal", "cta", "questions"]
      }
    }
  });

  return JSON.parse(response.text);
}

app.post("/api/generate", async (req, res) => {
  const input = {
    jobPost: String(req.body?.jobPost || "").trim(),
    skills: String(req.body?.skills || "").trim(),
    platform: String(req.body?.platform || "Upwork").trim(),
    tone: String(req.body?.tone || "Warm").trim()
  };

  if (!input.jobPost) {
    return res.status(400).json({ error: "Job post is required." });
  }

  try {
    const result = await generateWithGemini(input);
    return res.json(result);
  } catch (error) {
    console.error("Gemini generation failed. Using demo fallback.", error);
    return res.json(buildDemoProposal(input));
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`PitchMint running at http://localhost:${PORT}`);
  });
}

export default app;
