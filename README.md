# PitchMint MVP

Simple MVP for **PitchMint** with:

- a static frontend in plain HTML, CSS, and JavaScript
- a small Node.js + Express backend
- a real `/api/generate` endpoint
- Gemini integration using the official Google GenAI JavaScript SDK
- a built-in demo fallback if the AI call is unavailable

## Prerequisites

- Node.js 18+ installed

## Setup

1. Install dependencies:

```powershell
npm install
```

2. Create your environment file:

```powershell
Copy-Item .env.example .env
```

3. Open `.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=3000
```

## Get your Gemini API key

1. Go to Google AI Studio: `https://aistudio.google.com`
2. Sign in with your Google account
3. Click `Get API key`
4. Create a new API key
5. Copy the key
6. Paste it into your local `.env` file as `GEMINI_API_KEY=...`

## Run locally

Start the app:

```powershell
npm start
```

For auto-reload during development:

```powershell
npm run dev
```

Then open:

```text
http://localhost:3000
```

## How it works

- The frontend sends `jobPost`, `skills`, `platform`, and `tone` to `POST /api/generate`
- The backend calls Gemini and returns JSON with:
  - `opener`
  - `proposal`
  - `cta`
  - `questions`
- If the Gemini request fails, the backend falls back to the demo generator so the app still works

