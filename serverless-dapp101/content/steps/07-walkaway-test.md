# Walkaway Test

## Learning Objectives

By the end of this step, you'll:
- Understand what the "walkaway test" means
- Experience data persistence without a central database
- See how your app works independently

## Content

> 💡 **Visual Aid:** For a visual comparison of traditional apps vs serverless dapps in the walkaway test, 
> check out the [Walkaway Test](/visuals#walkaway-test) diagram in the Visual Lesson.

### What is the Walkaway Test?

The "walkaway test" is a simple but powerful concept: **Can your app and data survive if you shut down your server?**

With traditional apps:
- ❌ If you shut down the database, data is gone
- ❌ If you stop the server, the app is inaccessible
- ❌ You're locked into a vendor's infrastructure

With Arkiv:
- ✅ Your data lives on-chain (independent of your server)
- ✅ Anyone can read your data (it's public)
- ✅ You can rebuild your app from scratch and still access the same data
- ✅ No vendor lock-in

### Why This Matters

This demonstrates true decentralization:
- Your data doesn't depend on your infrastructure
- Multiple apps can read the same data
- You can migrate between hosting providers easily
- Your data persists even if your app goes offline

## Vibe Path (AI-Assisted)

```prompt
I'm at step 7: Walkaway Test.

Help me:
1. Understand what the walkaway test demonstrates
2. Stop my dev server and see that data persists
3. Restart the server and verify data is still accessible
4. Explain why this proves true decentralization

Explain data persistence and independence from infrastructure.
```

## Manual Path

### Step 7.1: Create Some Test Messages

Before we test, let's create a few messages that we'll use for the walkaway test:

1. Go to `http://localhost:3000/hello-world`
2. Submit 2-3 test messages (e.g., "Walkaway test message 1", "Walkaway test message 2")
3. Wait for them to appear in the list
4. Note which messages you created (so you can verify them later)

### Step 7.2: Stop the Development Server

1. Go to your terminal where the dev server is running
2. Press `Ctrl+C` (or `Cmd+C` on Mac) to stop the server
3. The server should stop and return you to the command prompt

**What just happened:**
- Your local server is now offline
- Your app is no longer accessible at `http://localhost:3000`
- BUT: Your data is still on Arkiv (on-chain)

### Step 7.3: Verify Data Persists (Explorer)

Even though your server is down, your data is still accessible:

1. Open one of the "View on Explorer" links from your messages (you can find these in your browser history, or use the explorer directly)
2. You'll see your transaction is still there, confirmed on-chain
3. Your message data is still visible in the transaction

**This proves:** Your data doesn't depend on your server - it's on the blockchain!

### Step 7.4: Restart the Server

1. Start the dev server again:
   ```bash
   npm run dev
   ```
2. Wait for it to start (you'll see "Ready" in the terminal)
3. Navigate to `http://localhost:3000/hello-world`

### Step 7.5: Verify Your Messages Are Still There

1. Refresh the page
2. Your messages should still appear in the list!
3. This is because the app reads from Arkiv (on-chain), not from a local database

**What this demonstrates:**
- Your app can be stopped and restarted
- Your data persists independently
- The app reads from Arkiv, not from local storage
- Multiple instances of your app can read the same data

### Step 7.6: Test with a Fresh Clone (Optional)

For an even more dramatic demonstration:

1. In a new terminal, clone the repo to a different location:
   ```bash
   cd /tmp  # or any other directory
   git clone YOUR_REPO_URL
   cd YOUR_REPO_NAME
   ```
2. Set up the `.env` file with the same `SPACE_ID=ns`
3. Run `npm install && npm run dev`
4. Navigate to the hello-world page
5. **Your messages from the original instance will appear!**

This proves that the data is truly independent of any specific app instance.

## Checkpoint

Before moving to the next step, verify:

- [ ] I've created test messages
- [ ] I've stopped the dev server
- [ ] I've verified my data is still on-chain (via explorer)
- [ ] I've restarted the server
- [ ] I've confirmed my messages still appear
- [ ] I understand why this proves true decentralization

## Troubleshooting

**Q: My messages don't appear after restarting.**
A: Make sure you're using the same `SPACE_ID` (should be "ns"). Also, wait a moment for the indexer to catch up, then refresh.

**Q: Can I access my data from a different computer?**
A: Yes! As long as you use the same `SPACE_ID`, you can access the data from anywhere. The data is public on-chain.

**Q: What if I want private data?**
A: You can use a unique `SPACE_ID` that only you know. While the data is still on-chain and technically public, it's only discoverable if someone knows your space ID.

**Q: Does this work in production?**
A: Yes! This is exactly how production Arkiv apps work. Your data persists independently of your hosting infrastructure.

**Q: Can multiple people see my messages?**
A: Yes! Since we're using `SPACE_ID=ns` (the shared workshop space), anyone using the same space ID can see all messages. In production, you'd use a unique space ID for your app.

**Q: Will my messages appear on the deployed hello-world page?**
A: Yes, as long as both your local environment and the deployed application use the same `SPACE_ID=ns`. The deployed page queries for all entities with `spaceId='ns'`, so messages from all tutorial participants using the same space ID will appear together. This works because Arkiv queries filter by space ID, not by wallet address.
