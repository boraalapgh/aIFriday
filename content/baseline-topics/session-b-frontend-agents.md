# Session B — Agents in the Frontend (OpenAI Agents SDK)

**Ready-to-run baseline topic** | **Estimated prep time:** 3-4 hours

---

## 📋 Session Overview

**Objective:** Walk through an agent calling tools for vector search, content generation, and code suggestions.

**Format:**
- Lightning talk (7 min): "When to use agents vs. simple prompts"
- Demo (20 min): Build a Next.js agent for onboarding copy generation
- Clinic (15 min): Agent architecture and guardrails discussion

**Target Audience:** Frontend devs, product engineers, anyone curious about AI agents

---

## ⚡ Lightning Talk: "When to use agents vs. simple prompts"

### Key Decision Framework:

#### Use Simple Prompts When:
- **Single-step tasks**: One input, one output
- **Predictable workflows**: Same process every time
- **Fast responses needed**: Sub-second requirements
- **Simple transformations**: Text formatting, basic analysis

#### Use Agents When:
- **Multi-step reasoning**: Need to break down complex problems
- **Tool usage required**: File access, API calls, calculations
- **Context switching**: Need to remember previous interactions
- **Adaptive workflows**: Different paths based on inputs

### Quick Examples:
- **Prompt**: "Rewrite this copy to be more engaging" ✅
- **Agent**: "Research our competitors, analyze our brand voice, then generate personalized onboarding copy for different user segments" ✅

### Cost & Complexity Trade-offs:
- Agents use more tokens (reasoning overhead)
- Longer response times but more powerful
- Need error handling and guardrails
- Worth it for complex, high-value tasks

---

## 🎯 Main Demo: Onboarding Copy Agent

### Demo Scenario:
Build a Next.js route that uses an agent to generate onboarding copy from component prop schemas.

### Demo Script (20 minutes):

#### Setup Overview (3 min)
- Show the goal: Component prop schema → Personalized onboarding copy
- Tools the agent will use:
  - Schema parser (reads component props)
  - Vector search (finds similar patterns)
  - Copy generator (creates personalized content)

#### Step 1: Agent Architecture (5 min)
```javascript
// Show agent structure
const agent = new Agent({
  name: "onboarding-copy-generator",
  instructions: "Generate onboarding copy based on component schemas",
  tools: [
    schemaParser,
    vectorSearch,
    copyGenerator
  ]
});
```

#### Step 2: Tool Implementation (7 min)
- **Schema Parser Tool**: Extract props, types, descriptions
- **Vector Search Tool**: Find similar components and copy examples
- **Copy Generator Tool**: Create contextual, personalized copy

#### Step 3: Agent in Action (5 min)
- Input: Component prop schema for a signup form
- Watch agent reasoning through the steps:
  1. Parse schema to understand form fields
  2. Search for similar signup flow examples
  3. Generate copy that matches brand voice
  4. Return formatted copy with alternatives

### Expected Agent Flow:
```
User: Generate onboarding copy for this signup component
Agent: I'll analyze the component schema first...
→ Tool: Parse schema (finds email, password, name fields)
Agent: Now I'll search for similar patterns...
→ Tool: Vector search (finds 3 relevant examples)
Agent: Based on patterns, I'll generate copy...
→ Tool: Generate copy (creates 3 variations)
Agent: Here's your personalized onboarding copy...
```

---

## 🛠 Technical Implementation

### Code Structure:
```
/pages/api/agent/
├── onboarding-copy.js    # Main agent endpoint
├── tools/
│   ├── schema-parser.js  # Component analysis
│   ├── vector-search.js  # Pattern matching
│   └── copy-generator.js # Content creation
└── utils/
    ├── agent-config.js   # Agent setup
    └── guardrails.js     # Safety checks
```

### Key Dependencies:
- `openai` - Agent SDK
- `@pinecone-database/pinecone` - Vector search
- `zod` - Schema validation
- Custom tools for component analysis

### Error Handling:
- Tool timeout handling
- Fallback responses
- Cost limiting (max tokens)
- Content safety filters

---

## 🏥 Open Clinic Topics

### Architecture Questions:
1. "How do you handle agent timeouts in production?"
2. "What's the best way to structure tool libraries?"
3. "How do you test agents end-to-end?"
4. "When should you cache agent responses?"

### Implementation Help:
- Tool development best practices
- Agent prompt engineering
- Cost optimization strategies
- Production deployment considerations

### Guardrails Discussion:
- Content safety filters
- Cost controls and limits
- User privacy considerations
- Error handling strategies

---

## 📚 Resources & Links

### OpenAI Agent Resources:
- [Agents SDK Documentation](https://platform.openai.com/docs/agents)
- [Tool Development Guide](https://platform.openai.com/docs/tools)
- [Best Practices](https://platform.openai.com/docs/guides/agent-best-practices)

### Implementation Examples:
- Demo repository: `{REPO_URL}`
- Tool library examples: `{TOOLS_REPO_URL}`
- Production patterns: `{PATTERNS_URL}`

### Related Tools:
- **LangChain**: Alternative agent framework
- **Vercel AI SDK**: Frontend AI integration
- **Pinecone**: Vector database for search

---

## 🎬 Preparation Checklist

### 1 Week Before:
- [ ] Set up OpenAI API access and limits
- [ ] Create demo Next.js application
- [ ] Build and test all three tools
- [ ] Prepare component schema examples

### 2-3 Days Before:
- [ ] Test full agent workflow end-to-end
- [ ] Prepare fallback examples if API fails
- [ ] Create slide deck for lightning talk
- [ ] Set up vector database with sample data

### Day Before:
- [ ] Verify all API keys and access
- [ ] Test demo in presentation environment
- [ ] Prepare code snippets for sharing
- [ ] Have monitoring/logging ready

### Day Of:
- [ ] Have local environment running
- [ ] Test internet connection for API calls
- [ ] Prepare to share screen and code
- [ ] Have backup slides if demo fails

---

## 🚨 Guardrails Checklist

### Cost Controls:
- [ ] Set maximum token limits per request
- [ ] Implement rate limiting
- [ ] Monitor usage dashboard
- [ ] Have kill switch for runaway costs

### Content Safety:
- [ ] Filter inappropriate requests
- [ ] Validate all tool outputs
- [ ] Log all agent interactions
- [ ] Review generated content

### Error Handling:
- [ ] Graceful degradation for tool failures
- [ ] Timeout handling for slow responses
- [ ] User-friendly error messages
- [ ] Fallback to simple prompts when needed

---

## 🔄 Follow-up Opportunities

### Immediate Actions:
- Share working agent code repository
- Provide tool development templates
- Create agent architecture guide

### Future Session Ideas:
- Advanced agent patterns (multi-agent systems)
- Agent testing and debugging strategies
- Cost optimization for production agents
- Custom tool development workshop

### Workshop Potential:
- Hands-on agent building session
- Team agent architecture review
- Tool library development workshop

---

**Estimated Impact:** High - Opens up new AI application possibilities
**Difficulty Level:** Advanced
**Reusability:** High - Patterns apply to many use cases