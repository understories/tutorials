# Run Locally

## Learning Objectives

By the end of this step, you'll:
- Have installed all dependencies
- Started the development server
- Verified the app is running correctly

## Content

### What We're Running

You're about to start a Next.js development server. This will:
- Compile your app
- Start a local server (usually on port 3000)
- Enable hot-reloading (changes appear instantly)

## Vibe Path (AI-Assisted)

```prompt
I'm at step 4: Run Locally.

Help me:
1. Install npm dependencies
2. Start the development server
3. Verify the app is running on localhost:3000
4. Understand what the dev server does

Keep it brief and actionable.
```

## Manual Path

### Step 4.1: Install Dependencies

First, install all the required packages:

```bash
npm install
```

This will download and install all dependencies listed in `package.json`. It may take a minute or two.

### Step 4.2: Start the Development Server

Start the Next.js development server:

```bash
npm run dev
```

You should see output like:
```
  ▲ Next.js 15.5.9
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### Step 4.3: Open in Browser

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the tutorial landing page!

### Step 4.4: Test the Hello World Demo

1. Click "See Hello World Demo →" on the landing page
2. Or navigate directly to: `http://localhost:3000/hello-world`
3. You should see the message board interface

**Note**: You may see an error if you haven't set up your environment variables yet. That's expected - we'll test writing messages in the next step.

## Checkpoint

Before moving to the next step, verify:

- [ ] I've run `npm install` successfully
- [ ] I've started the dev server with `npm run dev`
- [ ] The app is running on `http://localhost:3000`
- [ ] I can see the landing page
- [ ] I can navigate to the hello-world demo page

## Troubleshooting

**Q: `npm install` fails with errors.**
A: Make sure you have Node.js v18+ installed. Check with `node --version`. If issues persist, try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

**Q: Port 3000 is already in use.**
A: Next.js will automatically try the next available port (3001, 3002, etc.). Check the terminal output for the actual URL.

**Q: The page shows an error about missing environment variables.**
A: That's expected! Make sure you completed step 3 (Set Environment Variables). The error should go away once you've set up your `.env` file.

**Q: Changes I make don't appear.**
A: Make sure the dev server is running. If it stopped, restart it with `npm run dev`. The dev server should automatically reload when you save files.

**Q: How do I stop the dev server?**
A: Press `Ctrl+C` (or `Cmd+C` on Mac) in the terminal where the server is running.
