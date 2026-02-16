# Troubleshooting Google AI Quota Error

## Current Issue
You're getting a 429 error indicating Google AI quota is exhausted.

## Solutions

### Option 1: Try the Updated Code (Recommended First)
I've switched the model from `gemini-2.0-flash` to `gemini-1.5-flash` which may have different quota limits.

**Steps:**
1. Commit and push the changes
2. Wait for Netlify to redeploy
3. Try generating a prompt again

### Option 2: Check Your Google AI API Key
1. Go to https://aistudio.google.com/apikey
2. Check if your API key is valid
3. Look at your quota usage at https://ai.dev/rate-limit
4. If quota is exhausted, you may need to:
   - Wait 24 hours for free tier reset
   - Upgrade to paid tier

### Option 3: Create a New Google AI API Key
1. Go to https://aistudio.google.com/apikey
2. Delete the old key (if it exists)
3. Create a new API key
4. Update in Netlify:
   - Go to Site settings → Environment variables
   - Update `GOOGLE_API_KEY` with the new key
5. Redeploy

### Option 4: Upgrade to Google AI Paid Tier
1. Go to https://ai.google.dev/pricing
2. Set up billing
3. Upgrade your account
4. Much higher quotas available

### Option 5: Switch to OpenAI (Alternative)
If Google AI continues to have issues, you can switch to OpenAI:

1. Get an OpenAI API key from https://platform.openai.com/api-keys
2. Add to Netlify environment variables:
   - Variable name: `OPENAI_API_KEY`
   - Value: your OpenAI key
3. I can update the code to use OpenAI instead

## Current Quota Limits (Google AI Free Tier)
- **gemini-2.0-flash**: 10 requests/minute, 1,500 requests/day
- **gemini-1.5-flash**: 15 requests/minute, 1,500 requests/day
- **gemini-1.5-pro**: 2 requests/minute, 50 requests/day

## Which Option Should You Choose?

**If you want to keep using Google AI:**
- Try Option 1 first (already done)
- Then Option 3 (new API key)
- Finally Option 4 (upgrade to paid)

**If you want to switch providers:**
- Try Option 5 (OpenAI) - more reliable for production use

Let me know which option you'd like to pursue!
