# Setup Instructions

## Security Updates

This application now includes authentication and rate limiting to protect your API keys and quota.

## Local Development Setup

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and add your credentials:
   - `VITE_GOOGLE_API_KEY`: Your Google AI API key from https://ai.google.dev/
   - `VITE_APP_PASSWORD`: Choose a secure password for accessing the app

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Netlify Deployment Setup

1. Go to your Netlify site dashboard
2. Navigate to: Site settings → Environment variables
3. Add the following environment variables:
   - `VITE_GOOGLE_API_KEY`: Your Google AI API key
   - `VITE_APP_PASSWORD`: Your chosen password

4. Redeploy your site

## Security Features

### Authentication
- Password-protected access to the entire application
- Session-based authentication (stays logged in during browser session)
- Password stored securely in environment variables

### Rate Limiting
- Maximum 10 API requests per hour per session
- Prevents quota exhaustion from excessive use
- Automatic cleanup of old request timestamps

## Rotating Your API Key

If your API key has been compromised or quota exhausted:

1. Go to https://ai.google.dev/
2. Create a new API key
3. Delete the old API key
4. Update `VITE_GOOGLE_API_KEY` in:
   - Local `.env` file
   - Netlify environment variables
5. Redeploy on Netlify

## Monitoring Usage

- Check your Google AI quota: https://ai.dev/rate-limit
- Monitor Netlify deployment logs for any issues
- Rate limit errors will show in the browser console

## Troubleshooting

### "App password not configured" error
- Make sure `VITE_APP_PASSWORD` is set in your environment variables
- For Netlify, check Site settings → Environment variables
- Redeploy after adding the variable

### Rate limit errors
- Wait an hour before making more requests
- Consider upgrading to Google AI paid tier for higher quotas
- Or switch to OpenAI (see below)

## Switching to OpenAI (Optional)

If you want to use OpenAI instead of Google AI:

1. Get an OpenAI API key from https://platform.openai.com/
2. Add `VITE_OPENAI_API_KEY` to your environment variables
3. Update `src/pages/FrameworkDetail.tsx`:
   ```typescript
   // Change this line:
   import { generatePrompt } from '../services/ai'
   // To this:
   import { generatePrompt } from '../services/openai'
   ```
