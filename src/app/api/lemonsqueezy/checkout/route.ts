import { NextResponse } from 'next/server';
import { createCheckout, listStores, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';
import { createClient } from '@/utils/supabase/server';

// Initialize Lemon Squeezy
lemonSqueezySetup({
  apiKey: process.env.LEMONSQUEEZY_API_KEY || 'dummy_key',
  onError: (error) => console.error("Lemon Squeezy SDK Error:", error),
});

export const creditPacks = {
  freelancer: {
    priceCents: 1200,
    credits: 150,
  },
  studio: {
    priceCents: 2900,
    credits: 500,
  },
};

// Cache the store ID so we only fetch it once per cold start
let cachedStoreId: string | null = null;

async function getStoreId(): Promise<string> {
  // Allow manual override via env var
  if (process.env.LEMONSQUEEZY_STORE_ID) {
    return process.env.LEMONSQUEEZY_STORE_ID;
  }
  if (cachedStoreId) return cachedStoreId;

  const { data, error } = await listStores();
  if (error || !data?.data?.length) {
    throw new Error('Could not fetch Lemon Squeezy store ID. Check your API key.');
  }
  cachedStoreId = String(data.data[0].id);
  return cachedStoreId;
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { packId, variantId } = await req.json();

    if (!variantId) {
      return NextResponse.json({ error: 'Missing variantId' }, { status: 400 });
    }

    const pack = creditPacks[packId as keyof typeof creditPacks];
    if (!pack) {
      return NextResponse.json({ error: 'Invalid pack ID' }, { status: 400 });
    }

    // Auto-fetch store ID — no need to set LEMONSQUEEZY_STORE_ID manually
    const storeId = await getStoreId();

    const { data, error } = await createCheckout(
      storeId,
      variantId,
      {
        checkoutOptions: {
          embed: false,
          media: false,
        },
        checkoutData: {
          email: user.email,
          custom: {
            userId: user.id,
            packId: packId,
            credits: pack.credits.toString(),
          },
        },
      }
    );

    if (error) {
      console.error('Lemon Squeezy checkout error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ url: data?.data?.attributes?.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
