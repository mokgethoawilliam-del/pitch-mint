import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get user profile (email and credits)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, credits")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error("Error loading user profile:", profileError);
      return NextResponse.json(
        { error: "Could not retrieve user account settings." },
        { status: 500 }
      );
    }

    // Get user proposals (history) sorted by newest first
    const { data: proposals, error: proposalsError } = await supabase
      .from("proposals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (proposalsError) {
      console.error("Error loading user proposals:", proposalsError);
    }

    return NextResponse.json({
      user: {
        email: profile.email,
        credits: profile.credits,
      },
      history: proposals || [],
    });
  } catch (error: any) {
    console.error("Internal server error in user route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message || error },
      { status: 500 }
    );
  }
}
