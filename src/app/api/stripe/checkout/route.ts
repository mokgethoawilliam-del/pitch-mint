import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123', {
  apiVersion: '2026-05-27.dahlia', // Latest API version
});

// Define our credit packs mapping
export const creditPacks = {
  freelancer: {
    priceId: 'freelancer', // Using this as identifier
    priceCents: 1200,
    credits: 150,
    name: 'Freelancer Pack',
    description: '150 credits for consistent outreach.',
  },
  studio: {
    priceId: 'studio',
    priceCents: 2900,
    credits: 500,
    name: 'Studio Pack',
    description: '500 credits for teams.',
  },
};

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { packId } = await req.json();
    const pack = creditPacks[packId as keyof typeof creditPacks];

    if (!pack) {
      return NextResponse.json({ error: 'Invalid pack ID' }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: pack.name,
              description: pack.description,
            },
            unit_amount: pack.priceCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/app?success=true`,
      cancel_url: `${siteUrl}/pricing?canceled=true`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
        packId: packId,
        credits: pack.credits.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
