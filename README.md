# Infiner - AI Website Builder (Vercel-ready)

## Quick deploy (GitHub -> Vercel)
1. Create a GitHub repository and push all files in this repo.
2. Go to Vercel → New Project → Import from GitHub → select this repo.
   - Framework Preset: **Vite**
   - Root Directory: `/` (leave empty)
3. In Vercel Project Settings → Environment Variables:
   - Key: `GOOGLE_API_KEY`
   - Value: `AIzaSyDIKc96jiFKaI2iBxe3WFa_ExZfhRpfzNU`
   - Add to both Preview and Production.
4. Deploy. Wait for build to finish.
5. Open your site:
   - Visit `/login`, click "Continue" to go to the dashboard.
   - Try sample prompt and click **Generate**.

## Local dev (optional)
```bash
git clone <repo>
cd ai-builder
npm install
# set GOOGLE_API_KEY in your environment if you want to test serverless locally with Vercel CLI
npm run dev
