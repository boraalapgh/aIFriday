# Session C — Prompt Engineering Playbook for ICs

**Ready-to-run baseline topic** | **Estimated prep time:** 2 hours

---

## 📋 Session Overview

**Objective:** Share reusable prompt patterns for designers/devs (rewrite, critique, PRD scaffolds, test generators).

**Format:**
- Lightning talk (8 min): "The 5 prompt frameworks that actually stick"
- Demo (20 min): Live refactor - messy Jira ticket → crisp PRD + test plan
- Clinic (15 min): Bring your prompt challenges

**Target Audience:** All ICs - designers, developers, PMs, content creators

---

## ⚡ Lightning Talk: "The 5 prompt frameworks that actually stick"

### Framework 1: CLEAR (Context-Length-Examples-Action-Role)
```
Context: "Working on user onboarding flow redesign"
Length: "Need a 2-page analysis"
Examples: "Like the Stripe onboarding audit from 2023"
Action: "Analyze and recommend improvements"
Role: "You are a senior UX researcher"
```

### Framework 2: Chain of Thought
```
"Let's think through this step by step:
1. First, identify the core problem
2. Then, brainstorm 3 different approaches
3. Finally, evaluate each approach against our constraints"
```

### Framework 3: Few-Shot Learning
```
Input: "Fix login bug"
Good Output: "Bug: Login fails with 'invalid session' error
Steps to Reproduce: 1. Navigate to /login, 2. Enter valid credentials, 3. Submit form
Expected: User logged in successfully
Actual: Error message displayed, user remains logged out
Priority: P1 - blocks user access"

Now format this: "Payment not working"
```

### Framework 4: Role + Constraints
```
"You are a senior developer doing a code review.
Constraints:
- Focus on security and performance only
- Provide max 3 specific suggestions
- Include code examples for fixes"
```

### Framework 5: Iterative Refinement
```
"Draft a user story for photo uploads.
Then critique your own draft.
Then rewrite it addressing the criticism."
```

---

## 🎯 Main Demo: Jira Ticket → PRD + Test Plan

### Starting Point: Messy Jira Ticket
```
Title: Fix the thing
Description: Users are complaining that when they try to do the photo upload thing it doesn't work right. Sarah said it's probably the resize function. It works sometimes but not always. Very frustrating. Can we fix this ASAP?

- John mentioned it on Slack
- Might be related to large files
- Works fine in dev
- Some users can't upload at all
- Others get corrupted images
```

### Demo Script (20 minutes):

#### Step 1: Information Extraction (5 min)
**Prompt:**
```
You are a senior product manager. Analyze this messy bug report and extract:
1. Core problem statement
2. User impact
3. Symptoms and patterns
4. Missing information we need

[Paste ticket]
```

**Expected Output:** Structured analysis identifying the real issues

#### Step 2: PRD Generation (8 min)
**Prompt using CLEAR framework:**
```
Context: You're writing a PRD for a photo upload bug fix based on user complaints
Length: 1-2 pages, focus on problem definition and solution approach
Examples: Use standard PRD format with Problem, Solution, Success Metrics, Requirements
Action: Create a comprehensive PRD that engineering can work from
Role: Senior PM with 5+ years experience

Based on this analysis: [paste previous output]
```

**Live editing:** Show how to refine the output, add missing sections

#### Step 3: Test Plan Generation (7 min)
**Prompt using Role + Constraints:**
```
You are a senior QA engineer. Create a comprehensive test plan for this photo upload feature.

Constraints:
- Include happy path, edge cases, and error scenarios
- Focus on file size, format, and network conditions
- Provide specific test data and expected results
- Max 15 test cases, prioritized by risk

PRD: [paste PRD output]
```

### Expected Final Output:
- **Clean PRD**: Problem statement, solution approach, requirements, success metrics
- **Test Plan**: 15 prioritized test cases with specific data and expectations
- **Process**: Reusable prompt templates for future tickets

---

## 📚 Prompt Library for ICs

### For Developers:

#### Code Review Prompt
```
You are a senior developer reviewing code for security, performance, and maintainability.

Review this code and provide:
1. Security issues (if any)
2. Performance concerns
3. Maintainability suggestions
4. Code examples for fixes

Focus on the most critical issues first.

Code: [paste code]
```

#### Bug Analysis Prompt
```
Analyze this bug report and provide:
1. Root cause hypothesis
2. Steps to reproduce
3. Debugging approach
4. Potential solutions

Think through this systematically.

Bug report: [paste report]
```

### For Designers:

#### Design Critique Prompt
```
You are a senior UX designer reviewing a design for usability and accessibility.

Critique this design focusing on:
1. User flow clarity
2. Accessibility compliance
3. Visual hierarchy
4. Mobile responsiveness

Provide specific, actionable feedback.

Design: [describe or attach]
```

#### User Research Synthesis
```
You are a UX researcher analyzing user feedback.

Synthesize these user comments into:
1. Key themes and patterns
2. Priority issues (high/medium/low)
3. Specific improvement recommendations
4. Quotes that support each theme

Comments: [paste feedback]
```

### For Product/Content:

#### Feature Specification
```
You are a senior PM writing feature specifications.

Transform this feature idea into:
1. Clear problem statement
2. User stories with acceptance criteria
3. Success metrics
4. Implementation phases

Be specific and actionable.

Idea: [paste feature idea]
```

#### Content Rewrite Prompt
```
You are a content strategist optimizing copy for clarity and engagement.

Rewrite this content to be:
1. 20% more concise
2. More action-oriented
3. Accessible to non-experts
4. Consistent with our brand voice

Original: [paste content]
```

---

## 🏥 Open Clinic Topics

### Common Prompt Challenges:
1. "My prompts are too vague and get generic responses"
2. "How do I get consistent formatting from AI?"
3. "AI keeps giving me too much/too little detail"
4. "How do I make prompts work across different AI models?"

### Troubleshooting Session:
- Bring your actual work prompts
- Get help refining prompts that aren't working
- Share prompt patterns that work well for your role
- Collaborative prompt improvement

### Advanced Techniques:
- Prompt chaining for complex workflows
- Using AI to improve your prompts
- Building personal prompt libraries
- Team prompt standardization

---

## 🛠 Tools & Resources

### Prompt Management:
- **Notion templates**: Store and organize your prompt library
- **Text expanders**: Quick access to common prompts
- **ChatGPT/Claude**: Save effective prompts as templates

### Testing & Iteration:
- **A/B test prompts**: Compare outputs for the same task
- **Version control**: Track prompt improvements over time
- **Feedback loops**: Rate AI outputs to improve future prompts

### Team Sharing:
- **Shared prompt library**: Company-wide effective prompts
- **Prompt reviews**: Collaborative improvement
- **Best practices docs**: Guidelines for your team's context

---

## 🎬 Preparation Checklist

### 2-3 Days Before:
- [ ] Collect 3-4 real messy Jira tickets or work examples
- [ ] Test all demo prompts with different AI models
- [ ] Prepare prompt library document
- [ ] Create slide deck with 5 frameworks

### Day Before:
- [ ] Practice live demo transitions
- [ ] Have backup examples ready
- [ ] Test screen sharing and text visibility
- [ ] Prepare prompt templates to share

### Day Of:
- [ ] Have browser tabs set up for demo
- [ ] Keep prompts simple and readable on screen
- [ ] Be ready to adapt based on audience questions
- [ ] Have links ready to share in chat

---

## 📝 Takeaway Templates

### Personal Prompt Library Template:
```
## My Prompt Library

### Code Review
[paste your go-to code review prompt]

### Bug Analysis
[paste your bug analysis template]

### Meeting Notes
[paste your meeting summary prompt]

### Content Creation
[paste your content generation prompts]
```

### Team Prompt Standards:
- Consistent role definitions
- Standard constraint formats
- Shared context templates
- Quality criteria for outputs

---

## 🔄 Follow-up Opportunities

### Immediate Actions:
- Share comprehensive prompt library
- Create team prompt standards doc
- Set up prompt sharing channel/space

### Future Session Ideas:
- Advanced prompt patterns (multi-step workflows)
- AI-assisted prompt optimization
- Role-specific prompt workshops
- Building team prompt libraries

### Workshop Potential:
- Hands-on prompt writing workshop
- Team prompt audit and optimization
- Personal productivity with AI prompts

---

**Estimated Impact:** High - Immediate productivity boost for all ICs
**Difficulty Level:** Beginner to Intermediate
**Reusability:** Very High - Templates work across teams and roles