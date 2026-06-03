import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123', {
  apiVersion: '2026-05-27.dahlia',
});

// We need a Supabase admin client to bypass RLS, because webhooks run anonymously
// This requires SUPABASE_SERVICE_ROLE_KEY in your env vars
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key'
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Read custom metadata we attached in /api/stripe/checkout
    const userId = session.metadata?.userId;
    const packId = session.metadata?.packId;
    const creditsStr = session.metadata?.credits;

    if (!userId || !creditsStr || !packId) {
      console.error('Missing metadata in Stripe session');
      return new NextResponse('OK', { status: 200 }); // Return 200 so Stripe doesn't infinitely retry
    }

    const creditsToAdd = parseInt(creditsStr, 10);

    // 1. Log payment for audit trail
    const { error: paymentError } = await supabaseAdmin.from('payments').insert({
      user_id: userId,
      stripe_session_id: session.id,
      pack_id: packId,
      credits_added: creditsToAdd,
      amount_cents: session.amount_total || 0,
    });

    if (paymentError) {
      console.error('Failed to log payment:', paymentError);
      return new NextResponse('Database Error logging payment', { status: 500 });
    }

    // 2. Fetch current user credits
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      console.error('Failed to fetch profile:', profileError);
      return new NextResponse('Database Error fetching profile', { status: 500 });
    }

    // 3. Top up their credits
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ credits: profile.credits + creditsToAdd })
      .eq('id', userId);

    if (updateError) {
      console.error('Failed to update credits:', updateError);
      return new NextResponse('Database Error updating credits', { status: 500 });
    }
    
    console.log(`Successfully added ${creditsToAdd} credits to user ${userId}`);
  }

  return new NextResponse('OK', { status: 200 });
}
