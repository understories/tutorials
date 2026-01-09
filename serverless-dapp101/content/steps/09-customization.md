# Customize Your App

## Learning Objectives

By the end of this step, you'll:
- Understand how to customize the message format
- Know how to add new attributes
- Be able to modify the UI
- Have ideas for extending the app

## Content

### What Can You Customize?

Now that you understand the basics, you can customize:
- **Message format**: Add more fields (author, tags, etc.)
- **Attributes**: Add custom attributes for filtering
- **UI/UX**: Change the design, add features
- **Functionality**: Add editing, deletion markers, reactions, etc.

### Ideas for Customization

- Add user names or avatars
- Add message categories or tags
- Add timestamps in different formats
- Add a character counter
- Add message editing (via new entities)
- Add reactions or likes
- Add search functionality
- Add pagination
- Change the color scheme
- Add dark mode

## Vibe Path (AI-Assisted)

```prompt
I'm at step 9: Customize Your App.

Help me:
1. Add a new field to messages (like "author" or "category")
2. Update the entity creation to include the new field
3. Update the UI to display the new field
4. Update queries if needed

Provide code examples and explain the changes.
```

## Manual Path

### Step 9.1: Add a New Field to Messages

Let's add an "author" field to messages. This will demonstrate how to extend the data model.

**1. Update the API route** (`app/api/serverless-dapp101/messages/route.ts`):

In the POST handler, modify the payload and attributes:

```typescript
// In the POST function, update the body parsing:
const { text, author } = body; // Add author

// Update the payload:
const payload = JSON.stringify({
  text: text.trim(),
  author: author || 'Anonymous', // Add author with default
  createdAt: new Date().toISOString(),
});

// Optionally add author as an attribute for querying:
const attributes = [
  { key: 'type', value: 'workshop_message' },
  { key: 'wallet', value: walletAddress },
  { key: 'spaceId', value: querySpaceId },
  { key: 'author', value: author || 'Anonymous' }, // Add as attribute
  { key: 'created_at', value: new Date().toISOString() },
];
```

**2. Update the frontend** (`app/hello-world/page.tsx`):

Add an author input field:

```typescript
const [author, setAuthor] = useState('');

// In the form, add an author input:
<input
  type="text"
  value={author}
  onChange={(e) => setAuthor(e.target.value)}
  placeholder="Your name (optional)"
  className="px-4 py-2 border border-gray-300 rounded-lg"
/>

// Update the submit handler:
body: JSON.stringify({ text: newMessage, author }),
```

**3. Update the message display:**

```typescript
// In the message card, display the author:
<p className="text-gray-900 mb-2">{msg.text}</p>
<p className="text-sm text-gray-600 mb-2">— {msg.author || 'Anonymous'}</p>
```

### Step 9.2: Add Message Categories

Let's add categories so you can filter messages:

**1. Add category to attributes:**

```typescript
const attributes = [
  { key: 'type', value: 'workshop_message' },
  { key: 'wallet', value: walletAddress },
  { key: 'spaceId', value: querySpaceId },
  { key: 'category', value: category || 'general' }, // Add category
  { key: 'created_at', value: new Date().toISOString() },
];
```

**2. Add category filter in the UI:**

```typescript
const [selectedCategory, setSelectedCategory] = useState('all');

// Add filter dropdown
<select 
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="all">All Categories</option>
  <option value="general">General</option>
  <option value="question">Question</option>
  <option value="answer">Answer</option>
</select>

// Filter messages:
const filteredMessages = selectedCategory === 'all' 
  ? messages 
  : messages.filter(msg => msg.category === selectedCategory);
```

### Step 9.3: Improve the UI

**Add better styling:**

```typescript
// Add hover effects, better spacing, colors
<div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
  {/* Message content */}
</div>
```

**Add loading states:**

```typescript
{loading && <div className="text-center py-8">Loading messages...</div>}
{submitting && <div className="text-sm text-blue-600">Submitting to Arkiv...</div>}
```

### Step 9.4: Add Search Functionality

Add client-side search:

```typescript
const [searchQuery, setSearchQuery] = useState('');

// Filter messages by search query:
const filteredMessages = messages.filter(msg => 
  msg.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
  (msg.author && msg.author.toLowerCase().includes(searchQuery.toLowerCase()))
);
```

### Step 9.5: Test Your Customizations

1. Restart your dev server
2. Submit a message with your new fields
3. Verify it appears correctly
4. Test filtering/searching if you added those features

## Checkpoint

Before moving to the next step, verify:

- [ ] I've added at least one customization (new field, UI change, etc.)
- [ ] My customizations work correctly
- [ ] I understand how to extend the data model
- [ ] I know how to update both the API and frontend
- [ ] I have ideas for more customizations

## Troubleshooting

**Q: My new field doesn't appear.**
A: Make sure you've updated both the API (to store it) and the frontend (to display it). Also, check that you're reading it from the payload or attributes correctly.

**Q: How do I query by my new attribute?**
A: Add a `.where(eq('yourAttribute', value))` clause to your query. Make sure you're storing it as an attribute, not just in the payload.

**Q: Can I change the message format for existing messages?**
A: No, existing entities can't be modified. But new messages will use the new format. You can handle both formats in your code for backward compatibility.

**Q: How do I add validation?**
A: Add validation in the API route before creating the entity. Return an error response if validation fails.

**Q: Can I add images or files?**
A: Yes! You can store binary data in the payload. For large files, consider storing a hash on-chain and the file on IPFS or similar.
