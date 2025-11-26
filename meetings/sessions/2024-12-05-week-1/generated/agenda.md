# AI Friday - Week 1 Agenda
## Prompt Engineering Basics: 5 Frameworks That Actually Stick

**Date**: December 5th, 2024
**Duration**: 60 minutes
**Hosts**: Bora Alap (Primary) & Remy Reurling (Co-host)
**Recording**: Yes

---

## 🕐 Detailed Timeline

### 0:00-0:05 | Welcome & AI Friday Introduction (5 min)
**Host**: Bora Alap
**Objective**: Launch AI Friday community and set expectations

**Script Outline**:
> "Welcome to our inaugural AI Friday! I'm Bora, joined by Remy as co-host. This is something new we're starting - biweekly sessions where we share AI tools, tips, and learn from each other.
>
> **What is AI Friday?**
> - 60-minute biweekly sessions
> - Lightning talks + demos + open Q&A
> - Focus on practical, immediately useful AI skills
> - Everyone contributes - we learn together
>
> **Today's focus**: Prompt engineering basics - 5 frameworks you can use immediately to get better results from any AI tool.
>
> We're recording for folks who can't make it live. Let's dive in!"

**Key Points**:
- Establish recurring format and community purpose
- Set collaborative learning tone
- Preview today's immediate value

### 0:05-0:13 | Lightning Talk: "5 Frameworks That Actually Stick" (8 min)
**Host**: Bora Alap
**Objective**: Teach practical prompt frameworks with immediate applicability

#### Framework 1: CLEAR (Context-Length-Examples-Action-Role) [1.5 min]
**Example**:
```
Context: "Working on user onboarding flow redesign"
Length: "Need a 2-page analysis"
Examples: "Like the Stripe onboarding audit from 2023"
Action: "Analyze and recommend improvements"
Role: "You are a senior UX researcher"
```

#### Framework 2: Chain of Thought [1.5 min]
**Example**:
```
"Let's think through this step by step:
1. First, identify the core problem
2. Then, brainstorm 3 different approaches
3. Finally, evaluate each approach against our constraints"
```

#### Framework 3: Few-Shot Learning [1.5 min]
**Show Example Pattern**:
```
Input: "Fix login bug"
Good Output: "Bug: Login fails with 'invalid session' error..."

Now format this: "Payment not working"
```

#### Framework 4: Role + Constraints [1.5 min]
**Example**:
```
"You are a senior developer doing code review.
Constraints:
- Focus on security and performance only
- Provide max 3 specific suggestions
- Include code examples for fixes"
```

#### Framework 5: Iterative Refinement [1.5 min]
**Example**:
```
"Draft a user story for photo uploads.
Then critique your own draft.
Then rewrite it addressing the criticism."
```

**Takeaway**: "These 5 frameworks work with any AI tool. Now let's see them in action."

### 0:13-0:33 | Live Demo: Jira Ticket → PRD + Test Plan (20 min)
**Host**: Bora Alap (demo) + Remy Reurling (technical support)
**Objective**: Show frameworks solving real work problems

#### Demo Setup (2 min)
**Starting Point**: Messy Jira ticket
```
Title: Fix the thing
Description: Users complaining photo upload doesn't work right.
Sarah said it's probably the resize function. Works sometimes but not always.
Very frustrating. Can we fix ASAP?
- John mentioned it on Slack
- Might be related to large files
- Works fine in dev
- Some users can't upload at all
- Others get corrupted images
```

#### Step 1: Information Extraction using Role + Constraints (6 min)
**Live Prompt**:
```
You are a senior product manager. Analyze this messy bug report and extract:
1. Core problem statement
2. User impact
3. Symptoms and patterns
4. Missing information we need

[Paste messy ticket]
```

**Expected Output**: Structured analysis identifying real issues

#### Step 2: PRD Generation using CLEAR Framework (8 min)
**Live Prompt**:
```
Context: You're writing a PRD for photo upload bug fix based on user complaints
Length: 1-2 pages, focus on problem definition and solution approach
Examples: Use standard PRD format with Problem, Solution, Success Metrics, Requirements
Action: Create comprehensive PRD that engineering can work from
Role: Senior PM with 5+ years experience

Based on this analysis: [paste previous output]
```

**Live Editing**: Show refinement process, add missing sections

#### Step 3: Test Plan using Role + Constraints (4 min)
**Live Prompt**:
```
You are a senior QA engineer. Create comprehensive test plan for this photo upload feature.

Constraints:
- Include happy path, edge cases, error scenarios
- Focus on file size, format, network conditions
- Provide specific test data and expected results
- Max 15 test cases, prioritized by risk

PRD: [paste PRD output]
```

**Final Output**: Clean PRD + prioritized test plan from messy 3-line ticket

### 0:33-0:45 | Hands-On Practice: "Try It Yourself" (12 min)
**Host**: Remy Reurling (lead) + Bora Alap (support)
**Objective**: Immediate application of frameworks with personal work examples

#### Setup (2 min)
"Now it's your turn! Think of something messy from your own work - a vague request, unclear feedback, or confusing requirement."

#### Practice Round 1: CLEAR Framework (5 min)
**Instructions**:
1. "Share a messy work example in chat (keep it brief)"
2. "Choose one and we'll apply CLEAR framework together"
3. "Everyone try writing Context-Length-Examples-Action-Role"

**Group Exercise**: Pick one example, build CLEAR prompt together

#### Practice Round 2: Chain of Thought (5 min)
**Instructions**:
1. "Take your example and add 'Let's think step by step'"
2. "What are the logical steps to break down your problem?"
3. "Share your step-by-step breakdown"

**Wrap-up**: "How did that feel? Better structure?"

### 0:45-1:00 | Open Clinic: Q&A & Troubleshooting (15 min)
**Host**: Remy Reurling (lead) + Bora Alap (support)
**Objective**: Address specific challenges and build community engagement

#### Common Questions to Address:
- "My prompts are too vague and get generic responses"
- "How do I get consistent formatting from AI?"
- "AI gives me too much/too little detail"
- "How do I make prompts work across different AI tools?"

#### Interactive Troubleshooting:
- "Bring your real prompts that aren't working"
- "Let's fix them together using today's frameworks"
- "Share what prompt patterns work for your role"

#### Community Building:
- "What would you like to see in future AI Friday sessions?"
- "Anyone interested in presenting or sharing a tip?"
- "What AI challenges are you facing day-to-day?"

---

## 🎯 Key Takeaways for Attendees

### Immediate Actions:
1. **Save the 5 frameworks** - start using them today
2. **Create personal prompt library** - store what works
3. **Practice iterative refinement** - improve prompts over time

### Templates to Share:
- CLEAR framework template
- Chain of thought starter prompts
- Role + constraints examples
- Few-shot learning patterns

### Follow-up Resources:
- Recording of today's session
- Prompt library template
- Community Slack/Teams channel for ongoing questions

---

## 🎪 Host Coordination Notes

### Bora's Responsibilities:
- Welcome and AI Friday introduction
- Lightning talk delivery
- Primary demo presenter
- Overall timing and flow

### Remy's Responsibilities:
- Technical support during demo
- Lead hands-on practice session
- Moderate open clinic Q&A
- Monitor chat for questions

### Transition Cues:
- **To Demo**: "Let's see these frameworks solve real problems"
- **To Practice**: "Now it's your turn to try these"
- **To Clinic**: "What questions do you have? What can we help troubleshoot?"

### Backup Plans:
- If demo fails: Walk through expected outputs
- If no practice participation: Use prepared examples
- If no clinic questions: Share advanced prompt techniques

---

## 📝 Success Metrics

### During Session:
- [ ] At least 8 participants
- [ ] Active chat participation during practice
- [ ] Multiple questions/examples in clinic
- [ ] Positive reaction to format and content

### Post-Session:
- [ ] Recording shared within 24 hours
- [ ] At least 3 people report trying frameworks
- [ ] Interest expressed for next session
- [ ] Prompt templates downloaded/used

---

**Next AI Friday**: December 12th (Week 2) - Topic TBD based on community interest
**Session Materials**: All templates and resources will be shared post-session
**Community**: Continue discussions in [team channel] for ongoing AI Friday updates