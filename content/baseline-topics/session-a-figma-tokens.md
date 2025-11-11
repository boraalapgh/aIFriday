# Session A — Figma → Code: Tokens to Components

**Ready-to-run baseline topic** | **Estimated prep time:** 2-3 hours

---

## 📋 Session Overview

**Objective:** Show how Figma tokens/variables map to Tailwind v4 CSS vars and Storybook theming.

**Format:**
- Lightning talk (7 min): "Design tokens 101"
- Demo (20 min): Generate component from Figma frame
- Clinic (15 min): Q&A and troubleshooting

**Target Audience:** Designers, Frontend devs, anyone working with design systems

---

## ⚡ Lightning Talk: "Design tokens 101 in 7 minutes"

### Key Points to Cover:
1. **What are design tokens?**
   - Single source of truth for design decisions
   - Bridge between design and code
   - Examples: colors, typography, spacing, shadows

2. **Token naming conventions**
   - Semantic vs. literal naming
   - Tier structure (primitive → semantic → component)
   - Best practices for maintainability

3. **Scopes and contexts**
   - Global tokens vs. component-specific
   - Theme variants (light/dark mode)
   - Responsive tokens

4. **Benefits**
   - Consistency across platforms
   - Easier theme switching
   - Reduced design debt

### Suggested Slides:
- Slide 1: What are design tokens? (visual examples)
- Slide 2: Good vs. bad naming conventions
- Slide 3: Token hierarchy diagram
- Slide 4: Dark mode example
- Slide 5: Benefits summary

---

## 🎯 Main Demo: Figma to Component Pipeline

### Demo Script (20 minutes):

#### Setup (2 min)
- Show prepared Figma file with design tokens set up
- Quick overview of the tools we'll use:
  - Figma Dev Mode
  - Tailwind v4 CSS variables
  - Vue/React component
  - Storybook

#### Step 1: Extract tokens from Figma (5 min)
- Navigate to Figma design tokens panel
- Show how variables are structured
- Export tokens (manual or via plugin)
- Convert to CSS custom properties format

#### Step 2: Generate component structure (8 min)
- Create basic component file (Vue SFC or React TSX)
- Map Figma styles to CSS classes
- Use AI to generate initial component code
- Show how tokens become CSS variables

#### Step 3: Integrate with Storybook (5 min)
- Set up component story
- Demonstrate token switching (light/dark themes)
- Show controls for different token values
- Preview component variants

### Demo Assets Needed:
- **Figma file**: Button component with tokens defined
- **Token export**: JSON or CSS variables file
- **Component files**: Vue SFC and/or React TSX
- **Storybook setup**: Working stories with theme switching

### Expected Output:
- Working component that uses design tokens
- Storybook story with theme controls
- Reusable token system

---

## 🏥 Open Clinic Topics

### Common Questions:
1. "How do you handle token naming at scale?"
2. "What's the best way to sync Figma changes with code?"
3. "How do you handle component-specific overrides?"
4. "What tools make this process easier?"

### Troubleshooting Help:
- Token export/import issues
- CSS variable scoping problems
- Storybook theme switching setup
- Build tool configuration

---

## 📚 Resources & Links

### Tools Mentioned:
- **Figma**: Design token variables
- **Tailwind v4**: CSS custom properties
- **Storybook**: Component documentation
- **Token exporters**: Figma plugins for token extraction

### Reference Materials:
- [Design Tokens Specification](https://design-tokens.github.io/community-group/)
- [Tailwind CSS Custom Properties](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [Storybook Theming Guide](https://storybook.js.org/docs/configure/theming)

### Code Repositories:
- Demo repo: `{REPO_URL}`
- Token examples: `{TOKEN_EXAMPLES_URL}`
- Starter templates: `{STARTER_TEMPLATES_URL}`

---

## 🎬 Preparation Checklist

### 2-3 Days Before:
- [ ] Set up demo Figma file with tokens
- [ ] Create component examples (Vue + React)
- [ ] Test Storybook theme switching
- [ ] Prepare slide deck (5 slides max)

### Day Before:
- [ ] Test all demo steps end-to-end
- [ ] Verify screen sharing and tools work
- [ ] Have backup examples ready
- [ ] Prepare answers to common questions

### Day Of:
- [ ] Have all browser tabs ready
- [ ] Test microphone and screen sharing
- [ ] Keep demo simple and focused
- [ ] Have links ready to share in chat

---

## 🔄 Follow-up Opportunities

### Immediate Actions:
- Share demo repository
- Provide token starter templates
- Create how-to documentation

### Future Session Ideas:
- Advanced token architectures
- Automated token sync workflows
- Multi-platform token systems
- Design system governance

### Workshop Potential:
- Hands-on token setup workshop
- Team design system audit
- Token naming workshop

---

**Estimated Impact:** High - Bridges design/dev gap, improves consistency
**Difficulty Level:** Intermediate
**Reusability:** High - Can adapt for different tech stacks