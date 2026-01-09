# Optional: Deploy to Vercel

## Learning Objectives

By the end of this step, you'll:
- Know how to deploy your app to Vercel
- Understand how to set environment variables in production
- Have a live, publicly accessible version of your app

## Content

### What is Vercel?

Vercel is a platform for deploying Next.js apps (and other frameworks). It provides:
- **Free hosting**: For hobby projects
- **Automatic deployments**: From Git
- **Environment variables**: Secure configuration
- **Global CDN**: Fast worldwide
- **HTTPS**: Automatic SSL certificates

### Why Deploy?

Deploying makes your app:
- **Publicly accessible**: Share it with others
- **Always online**: No need to run your local server
- **Production-ready**: See how it performs in the real world

## Vibe Path (AI-Assisted)

```prompt
I'm at step 10: Optional: Deploy to Vercel.

Help me:
1. Push my code to GitHub (if not already)
2. Connect my repo to Vercel
3. Set environment variables in Vercel
4. Deploy and verify it works

Provide step-by-step instructions for Vercel deployment.
```

## Manual Path

### Step 10.1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
# Make sure .env is not committed (it's in .gitignore)
git add .
git commit -m "Complete Arkiv tutorial app"
git push origin main
```

**Important**: Verify that `.env` is NOT in your repository (it should be gitignored).

### Step 10.2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account (recommended)
3. Complete the onboarding

### Step 10.3: Import Your Project

1. Click "Add New Project" in Vercel dashboard
2. Select "Import Git Repository"
3. Choose your GitHub repository
4. Click "Import"

### Step 10.4: Configure Build Settings

Vercel should auto-detect Next.js, but verify:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (or your project root)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)

Click "Deploy" to start the first deployment.

### Step 10.5: Set Environment Variables

**Before the deployment completes**, set your environment variables:

1. In the project settings, go to "Environment Variables"
2. Add each variable:
   - **Name**: `SPACE_ID`
   - **Value**: `ns`
   - **Environment**: Production, Preview, Development (check all)
   
3. Add the second variable:
   - **Name**: `ARKIV_PRIVATE_KEY`
   - **Value**: Your private key (from your `.env` file)
   - **Environment**: Production, Preview, Development (check all)

**Security Note**: 
- Never commit your private key to Git
- Only add it in Vercel's environment variables
- Vercel encrypts environment variables at rest

### Step 10.6: Wait for Deployment

1. Vercel will build your app (takes 1-2 minutes)
2. You'll see build logs in real-time
3. Once complete, you'll get a deployment URL like: `https://your-app.vercel.app`

### Step 10.7: Verify Your Deployment

1. Visit your deployment URL
2. Test the hello-world demo
3. Submit a message
4. Verify it works the same as locally

**Note**: The first request might be slow (cold start), but subsequent requests will be fast.

### Step 10.8: Set Up Custom Domain (Optional)

If you have a domain:
1. Go to Project Settings → Domains
2. Add your domain
3. Follow Vercel's DNS instructions
4. Wait for DNS propagation (can take a few hours)

## Checkpoint

Before moving to the next step, verify:

- [ ] I've pushed my code to GitHub
- [ ] I've connected my repo to Vercel
- [ ] I've set environment variables in Vercel
- [ ] My app is deployed and accessible
- [ ] I can submit messages on the deployed version
- [ ] I understand how environment variables work in production

## Troubleshooting

**Q: Build fails on Vercel.**
A: Check the build logs. Common issues:
- Missing dependencies (check `package.json`)
- TypeScript errors (run `npm run typecheck` locally first)
- Environment variable errors (make sure they're set)

**Q: My app works locally but not on Vercel.**
A: Check:
- Environment variables are set correctly
- The build completed successfully
- Check Vercel's function logs for runtime errors

**Q: Can I use a different private key for production?**
A: Yes! In fact, it's recommended. Generate a new wallet for production and only fund it with what you need. Never use your main wallet's private key.

**Q: How do I update my deployment?**
A: Just push to your Git repository. Vercel will automatically deploy new commits. You can also trigger manual deployments from the Vercel dashboard.

**Q: Is Vercel free?**
A: Yes, for hobby projects. The free tier includes:
- Unlimited deployments
- 100GB bandwidth/month
- Serverless functions
- Automatic HTTPS

**Q: Can I deploy to other platforms?**
A: Yes! Next.js apps can be deployed to:
- Netlify
- Railway
- Render
- AWS Amplify
- Your own server (with `npm run build && npm start`)

**Q: How do I see logs from production?**
A: In Vercel dashboard, go to your project → "Functions" tab → Click on a function to see logs. Or use the "Logs" section in the deployment view.
