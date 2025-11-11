# AI Friday Process Guide

Complete workflow documentation for the AI Friday meeting management system.

## 🎯 Overview

This guide documents the end-to-end process for managing AI Friday sessions, from initial planning through post-session follow-up and archival. It covers both manual processes and automated workflows using Claude Code and the automation scripts.

### Process Philosophy

**Minimize Administrative Overhead:**
- Use templates and automation to reduce manual work
- Create reusable processes that scale
- Focus host energy on content and community building

**Maximize Learning Value:**
- Structure content for immediate applicability
- Create searchable knowledge base
- Enable cross-session learning and building

**Build Sustainable Community:**
- Rotate speakers and hosts for diverse perspectives
- Create low-friction ways to contribute
- Document tribal knowledge before it's lost

## 📊 Complete Workflow Overview

```
Planning (2 weeks) → Preparation (1 week) → Execution (60 min) → Follow-up (1 week) → Archive
       ↓                    ↓                    ↓                   ↓              ↓
   /new-session      /prep-meeting         [Manual]        /process-notes    [Archive]
  Content curation  Communications        Facilitation    Documentation    Knowledge base
  Speaker outreach  Tech preparation      Recording       Resource sharing  Retrospective
```

## 🚀 Phase 1: Session Planning (2 weeks before)

### Goals
- Establish session structure and content
- Recruit speakers and confirm topics
- Set up all necessary templates and tracking

### Key Activities

#### 1. Session Creation
**Command:** `/new-session`

**What it does:**
- Creates session folder with date-based naming
- Generates agenda template with placeholders
- Sets up notes template for scribe
- Creates follow-up tracking template
- Establishes folder structure for artifacts

**Manual follow-up:**
- Review generated agenda for accuracy
- Customize timing if special format needed
- Add any specific session themes or focuses

#### 2. Content Pipeline Management
**Command:** `/update-backlog`

**What it does:**
- Reviews current submission queue
- Prioritizes topics by relevance and timing
- Identifies gaps in content coverage
- Generates speaker outreach templates

**Speaker Recruitment Strategy:**
```
Priority 1: Confirmed submissions (scheduled speakers)
Priority 2: Previous presenters with new topics
Priority 3: Team members with known AI experience
Priority 4: Cross-team experts for specific topics
Priority 5: Baseline topics as backup content
```

#### 3. Quality Assurance
- Ensure topic diversity (not all similar tools/approaches)
- Balance experience levels (beginner insights are valuable)
- Mix content types (lightning talks + demos + discussions)
- Verify technical requirements can be met

### Outputs
- Complete session folder structure
- Initial agenda with speakers (or baseline topics)
- Speaker outreach communications sent
- Backup content identified and ready

## 🛠 Phase 2: Session Preparation (1 week before)

### Goals
- Finalize all session logistics
- Prepare speakers for success
- Generate all communication materials
- Create backup plans for potential issues

### Key Activities

#### 1. Meeting Preparation
**Command:** `/prep-meeting`

**What it does:**
- Generates host checklist with all pre-session tasks
- Creates speaker preparation guidelines
- Produces communication templates (emails, Slack, reminders)
- Identifies backup topics if speakers drop out

#### 2. Speaker Coordination
**Process:**
- Send speaker prep package with guidelines and timing
- Confirm technical requirements (demos, screen sharing)
- Collect abstracts and resource links for agenda
- Schedule brief tech checks for complex demos

**Speaker Success Package:**
- Timing expectations and format guidelines
- Technical setup recommendations
- Resource sharing templates
- Examples from successful previous presentations

#### 3. Communication Generation
**Automation script:** `npm run update-calendar`

**What it generates:**
- Calendar invite with complete agenda
- Email announcement template
- Slack/Teams channel messages
- Reminder emails (2-day and day-before)
- ICS calendar file for distribution

#### 4. Logistics Preparation
- Test Teams meeting room and recording setup
- Prepare session agenda in easily readable format
- Set up shared document for real-time link sharing
- Prepare backup discussion topics for quiet moments

### Outputs
- Finalized agenda with confirmed speakers
- All communication materials ready for distribution
- Speaker prep packages delivered
- Technical setup tested and confirmed
- Backup plans established

## 🎪 Phase 3: Session Execution (60 minutes)

### Goals
- Deliver valuable learning experience for all attendees
- Maintain energy and engagement throughout
- Capture all shared resources and insights
- Foster community connections and future collaboration

### Structure and Timing

#### Opening (5 minutes)
**Host responsibilities:**
- Welcome attendees and set expectations
- Introduce agenda and speakers
- Start recording and announce to attendees
- Gather quick wins and AI victories from team

**Key phrases:**
- "We're recording for folks who can't make it"
- "Share links and resources in chat as we go"
- "Save complex technical questions for the clinic"

#### Lightning Talks (20 minutes)
**Management approach:**
- Strict time limits with visible timer
- Encourage questions but defer deep technical discussions
- Highlight key takeaways between speakers
- Capture all shared resources in real-time

**Facilitation techniques:**
- "That's a great insight, [Name]. For those following along, the key takeaway is..."
- "I'm seeing some great questions in chat. Let's park those for the clinic."
- "Before we move on, what's one thing everyone can try this week?"

#### Feature Demo (20 minutes)
**Structure:**
- Context setting (2 min): Why this matters
- Live demonstration (15 min): Step-by-step walkthrough
- Debrief (3 min): Key learnings and gotchas

**Demo management:**
- Allow natural pauses for questions
- Have presenter explain thought process
- Prepare for technical failures gracefully
- Focus on practical takeaways

#### Open Clinic (15 minutes)
**Facilitation approach:**
- Start with problems from chat or previous sessions
- Encourage multiple perspectives on solutions
- Create connections between people with similar challenges
- End with clear action items and follow-up plans

**Community building:**
- "Who else has worked with [tool/approach]?"
- "That sounds like something [team/person] was exploring..."
- "Would anyone be interested in pairing on this?"

### Real-time Documentation

**Scribe responsibilities:**
- Capture key insights and quotes
- Record all shared links and resources
- Note action items and follow-up commitments
- Track attendance and engagement patterns

**Chat management:**
- Monitor for questions and technical issues
- Collect shared resources for later organization
- Facilitate introductions between interested parties
- Capture follow-up collaboration requests

### Outputs
- Complete session recording
- Structured notes with key insights
- Comprehensive resource list
- Action items with clear owners
- Community connection requests

## 📚 Phase 4: Post-Session Follow-up (1 week after)

### Goals
- Transform raw session content into structured knowledge
- Distribute resources and follow up on action items
- Prepare content for long-term searchability
- Plan future sessions based on insights

### Key Activities

#### 1. Content Processing
**Command:** `/process-notes`

**What it does:**
- Converts raw notes into structured documentation
- Extracts and organizes all shared resources
- Creates action item tracking with owners and deadlines
- Generates executive summary for stakeholders
- Prepares content for knowledge base integration

#### 2. Resource Organization
**Process:**
- Validate all shared links are working
- Categorize tools and resources by type and use case
- Add new resources to master resource library
- Create cross-references between related sessions

#### 3. Knowledge Base Integration
**Automation script:** `npm run export-confluence`

**What it generates:**
- Confluence-ready page content
- Structured meeting notes with proper formatting
- Resource sections organized by category
- Action item tables with tracking
- Next session preview and planning

#### 4. Community Follow-up
**Communications:**
- Thank you messages to speakers
- Session summary to broader team
- Individual follow-ups on action items
- Resource sharing in relevant team channels

#### 5. Future Planning
- Update speaker pipeline with new interests
- Note topic requests and follow-up ideas
- Identify successful formats for replication
- Plan thematic sessions or workshop formats

### Quality Assurance

**Content review checklist:**
- [ ] All action items have clear owners and deadlines
- [ ] Shared resources are working and properly categorized
- [ ] Key insights are captured and highlighted
- [ ] Content is searchable and well-organized
- [ ] Follow-up commitments are tracked

**Knowledge integration:**
- [ ] New resources added to master library
- [ ] Cross-references created to related sessions
- [ ] Templates updated based on new learnings
- [ ] Process improvements identified and documented

### Outputs
- Structured meeting documentation
- Updated resource library
- Action item tracking system
- Confluence-ready content
- Future session planning updates

## 🗄 Phase 5: Archival and Knowledge Management

### Goals
- Preserve session value for long-term reference
- Create searchable knowledge base
- Enable cross-session learning and building
- Maintain system organization and performance

### Archival Criteria

**Sessions ready for archive:**
- All action items completed or transferred
- Content fully processed and integrated
- Resources validated and organized
- Follow-up commitments fulfilled

### Archival Process

**Automation script:** `npm run process-recordings --archive`

**What it does:**
- Moves completed session to archive folder
- Updates session index with final status
- Creates permanent links for reference
- Generates archival summary

### Knowledge Base Maintenance

**Quarterly review process:**
- Update resource library with usage analytics
- Consolidate related session insights
- Identify knowledge gaps for future sessions
- Archive outdated or superseded content

**Annual retrospective:**
- Analyze session themes and evolution
- Document community growth and engagement
- Update process based on lessons learned
- Plan strategic direction for upcoming year

## 🔧 Automation and Tool Integration

### Claude Code Integration

**Primary workflows:**
```bash
# Session setup and planning
/new-session          # Complete session creation
/update-backlog       # Speaker pipeline management

# Preparation and communication
/prep-meeting         # Generate all prep materials

# Post-session processing
/process-notes        # Structure content and resources
```

### Node.js Automation Scripts

**Advanced workflows:**
```bash
cd automation

# Complete new session workflow
npm run workflow -- --type new

# Complete session processing workflow
npm run workflow -- --type complete

# Individual script execution
npm run new-session          # Interactive session setup
npm run process-recordings   # Organize artifacts
npm run update-calendar      # Generate communications
npm run export-confluence    # Format for knowledge base
```

### Integration Points

**File system organization:**
- Standardized folder structures for consistency
- Template-based content generation
- Automated cross-referencing and linking

**External system integration:**
- Confluence export for team knowledge base
- Calendar system integration for scheduling
- Git version control for change tracking
- Team communication platform integration

## 📊 Quality Metrics and Improvement

### Session Success Metrics

**Quantitative measures:**
- Attendance trends and consistency
- Resource sharing volume and quality
- Action item completion rates
- Community engagement indicators

**Qualitative assessment:**
- Content quality and practical value
- Community building and connections
- Learning progression across sessions
- Innovation and experimentation sparked

### Process Improvement

**Regular review questions:**
- Which automation saves the most time?
- What manual processes could be automated?
- Where do hosts spend unnecessary effort?
- How can we improve content discovery?

**Continuous optimization:**
- Update templates based on usage patterns
- Refine automation based on user feedback
- Streamline workflows for common scenarios
- Expand automation for identified pain points

## ❓ Troubleshooting and FAQs

### Common Issues

**Speaker drops out last minute:**
- Use baseline topics (Sessions A-F) as immediate backup
- Convert to community discussion format
- Invite lightning talks from audience
- Use session for retrospective and planning

**Technical difficulties during session:**
- Have screenshots ready for failed demos
- Use technical issues as learning opportunities
- Keep backup discussion topics ready
- Maintain session energy with community discussion

**Low attendance or engagement:**
- Review session timing and communication
- Survey team for content preferences
- Experiment with different formats
- Ensure content is relevant to daily work

### Process Troubleshooting

**Command/script failures:**
- Check file paths and permissions
- Verify template file integrity
- Review automation logs for errors
- Fall back to manual process if needed

**Template customization:**
- All templates are designed to be modified
- Copy templates before customizing
- Document changes for team consistency
- Share useful modifications with community

---

## 🎉 Process Maturity

This process guide represents a complete workflow for sustainable AI Friday management. As your community grows and evolves:

**Adapt the process** to your team's specific needs and culture
**Scale the automation** to handle increased session frequency
**Expand the knowledge base** to capture growing team expertise
**Build the community** through improved facilitation and engagement

The goal is to minimize administrative overhead while maximizing learning value and community building. The process should feel supportive, not burdensome, for both hosts and participants.

**Questions about the process?** Check the #ai-friday channel or contribute improvements through GitHub issues.