# Visual Assets for Serverless DApp 101 Workshop

This directory contains all visual aids for the serverless-dapp101 workshop tutorial mode.

## Phase 1 - Core Visuals

### 1. `architecture-comparison.svg`
**Purpose:** Side-by-side comparison of traditional app vs serverless dapp architecture  
**When to use:** Step 1 (Quick Start), Step 8 (Understanding Arkiv)  
**Alt text:** "Side-by-side comparison of a traditional app where data is stored in a company database versus a serverless dapp where data is stored on the Arkiv network and owned by the user."

### 2. `stack-comparison.svg`
**Purpose:** Shows how Arkiv fits into the familiar development stack  
**When to use:** Step 1 (Quick Start), Step 2 (Fork Setup)  
**Alt text:** "Comparison of the Vibes to App development stack with the Serverless DApp stack, highlighting Arkiv as the new decentralized data layer."

### 3. `path-toggle.svg`
**Purpose:** Clarifies the two development paths (AI-assisted vs manual)  
**When to use:** Step 1 (Quick Start), throughout tutorial  
**Alt text:** "Two parallel development paths: an AI-assisted path and a manual tutorial path, both leading to a working application."

### 4. `concept-bridges.svg`
**Purpose:** Connects Vibes to App concepts to new serverless concepts  
**When to use:** Throughout tutorial, especially Step 8 (Understanding Arkiv)  
**Alt text:** "Conceptual progression showing how ideas from the Vibes to App workshop extend into serverless and decentralized application concepts."

## Phase 2 - Hands-On Visuals

### 5. `data-flow-write.svg`
**Purpose:** Shows how data moves when writing to Arkiv  
**When to use:** Step 5 (Create First Record), Step 6 (Verify on Explorer)  
**Alt text:** "Write flow showing how a user action becomes a signed Arkiv transaction recorded on the blockchain and visible in the explorer."

### 6. `data-flow-read.svg`
**Purpose:** Shows how data is queried from Arkiv  
**When to use:** Step 5 (Create First Record), Step 6 (Verify on Explorer)  
**Alt text:** "Read flow showing how application data is queried from Arkiv and displayed in the user interface."

### 7. `entity-structure.svg`
**Purpose:** Shows how data is structured in Arkiv  
**When to use:** Step 5 (Create First Record), Step 8 (Understanding Arkiv)  
**Alt text:** "Diagram of an Arkiv entity showing its unique ID, queryable attributes, content payload, and transaction hash used for verification."

### 8. `walkaway-test.svg`
**Purpose:** Demonstrates data independence visually  
**When to use:** Step 7 (Walkaway Test)  
**Alt text:** "Comparison showing that data stored in a traditional app is lost when the app shuts down, while data stored on Arkiv remains accessible to new applications."

### 9. `verification-flow.svg`
**Purpose:** Shows how blockchain verification works  
**When to use:** Step 6 (Verify on Explorer)  
**Alt text:** "Step-by-step flow showing how a transaction hash is used to verify data on the blockchain using the Arkiv explorer."

## Usage in Tutorial

Visuals can be embedded in markdown content using the `VisualAid` component:

```tsx
<VisualAid 
  type="comparison"
  src="/visuals/architecture-comparison.svg"
  alt="Comparison of traditional app vs serverless dapp architecture"
/>
```

Or directly in markdown using standard image syntax:

```markdown
![Architecture Comparison](/visuals/architecture-comparison.svg)
```

## Design Specifications

- **Format:** SVG (scalable, accessible)
- **Dimensions:** Responsive (use viewBox, not fixed width/height)
- **Colors:** CSS variables for theming where applicable
- **Text:** Semantic `<text>` elements for accessibility
- **Accessibility:** All visuals include `<title>`, `<desc>`, and `aria-label` attributes

## Color Scheme

- **Neutral Gray:** Shared components (#6b7280)
- **Red:** Company ownership, failures (#ef4444)
- **Green:** User ownership, success (#10b981)
- **Blue:** Read operations, information (#3b82f6)
- **Orange/Yellow:** Write operations, transactions (#fb923c)
