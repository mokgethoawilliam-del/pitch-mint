# PitchMint 🌿

> **The AI-powered proposal generator for freelancers.**
> Turn client briefs into persuasive, copy-ready proposals in seconds.

PitchMint is a fully functional micro-SaaS built for freelancers and agencies. It takes the heavy lifting out of client outreach by structuring proposals based on platform (Upwork, Email, LinkedIn) and tone. 

It comes fully equipped with secure authentication, a database for proposal history, AI generation, and Stripe billing, making it ready to scale and monetize from day one.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Billing**: [Stripe](https://stripe.com/)
- **AI Generation**: [Google Gemini](https://aistudio.google.com/) (Primary) & [Groq](https://groq.com/) (Fallback)

## ✨ Features

- **Premium UI/UX**: Custom design system with a beautiful, responsive 3-column workspace.
- **Secure Authentication**: Email/Password sign-up and login powered by Supabase Auth.
- **Proposal History**: All generated proposals are automatically saved to the user's database and accessible via the sidebar.
- **Credit System**: Users consume credits per generation, preventing API abuse.
- **Stripe Integration**: Users can buy one-time credit packs via Stripe Checkout. Secure Webhooks automatically top-up their balance upon successful payment.
- **AI Fallback Chain**: Designed for reliability. If the primary AI (Gemini) fails or hits rate limits, it seamlessly falls back to Groq's Llama models.

---

## 🛠️ Developer Setup Guide

Follow these steps to get PitchMint running locally on your machine.

### 1. Clone & Install
```bash
git clone https://github.com/your-username/pitch-mint.git
cd pitch-mint
npm install
```

### 2. Environment Variables
Rename the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the required keys in `.env.local`. You will need developer API keys from:
- Google AI Studio (for Gemini)
- Groq Console (for Llama-3)
- Supabase (for Auth and Postgres DB)
- Stripe (for Payments)

### 3. Database Setup (Supabase)
1. Create a new project in [Supabase](https://database.new).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open the `supabase/schema.sql` file from this repository, paste its contents into the SQL Editor, and hit **Run**.
   - *This script automatically creates the `profiles`, `proposals`, and `payments` tables, sets up secure Row Level Security (RLS) policies, and configures the automatic user-creation trigger.*

### 4. Stripe Webhook Setup (Local Testing)
To test payments locally, you need to forward Stripe webhooks to your local server:
1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Run the following command:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
3. Copy the `whsec_...` webhook secret provided in the terminal and paste it into `STRIPE_WEBHOOK_SECRET` in your `.env.local` file.

### 5. Run the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💰 Pricing Configuration
Pricing and credit pack sizes are defined in two places. If you wish to change the pricing model, update these files:
1. **Frontend UI**: `src/components/pitchmint.tsx` (Update the `pricingPreview` array).
2. **Backend Logic**: `src/app/api/stripe/checkout/route.ts` (Update the `creditPacks` object and ensure the price matches your Stripe Product settings).

## 📝 License
Proprietary - All rights reserved.
