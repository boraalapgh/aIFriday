# Session F — Figma MCP & Code Generation

**Ready-to-run baseline topic** | **Estimated prep time:** 4-5 hours

---

## 📋 Session Overview

**Objective:** Showcase Figma MCP + Cursor/CLI to generate components from design system primitives.

**Format:**
- Lightning talk (8 min): "MCP in plain English"
- Demo (20 min): Figma component → typed UI component + Storybook story
- Clinic (15 min): Design-to-code quality and workflow integration

**Target Audience:** Developers, designers, anyone interested in design-to-code automation

---

## ⚡ Lightning Talk: "MCP in plain English"

### What is MCP (Model Context Protocol)?
**Simple explanation:** MCP lets AI tools talk to other software directly, like giving Claude access to your Figma files.

#### Before MCP:
```
Designer: "Here's a screenshot of the component"
Developer: "I can see it, but I need to guess the spacing, colors, typography..."
AI: "I can see the image but don't know the exact design specs"
```

#### With MCP:
```
Claude: "I can read your Figma file directly"
Claude: "I see this button uses token 'primary-500' and spacing 'md'"
Claude: "I can generate code that matches exactly"
```

### How MCP Works:

#### 1. Connection Setup
- MCP server connects to Figma API
- Claude gets permission to read design files
- Design tokens and component specs become accessible

#### 2. Direct Data Access
- **Design tokens**: Colors, typography, spacing values
- **Component structure**: Layers, properties, variants
- **Design system relationships**: Connected components and patterns

#### 3. Code Generation
- **Accurate implementation**: Real values, not approximations
- **Design system compliance**: Uses actual tokens and patterns
- **Type safety**: Generates proper TypeScript interfaces

### Benefits Over Screenshots:
- **Precision**: Exact values instead of visual estimates
- **Context**: Understands design system relationships
- **Automation**: Can process multiple components at once
- **Consistency**: Generated code follows design system rules

### Current Limitations:
- **Setup complexity**: Requires technical configuration
- **API access**: Need proper Figma permissions
- **Custom logic**: AI can't infer complex interaction behavior
- **Design quality**: Output quality depends on design system maturity

---

## 🎯 Main Demo: Figma to Component Pipeline

### Demo Setup:
- **Figma file**: Well-structured component with design tokens
- **MCP server**: Connected to Figma API
- **Development environment**: Claude Code with Figma MCP
- **Target output**: React/Vue component + Storybook story

### Demo Script (20 minutes):

#### Step 1: MCP Connection & File Access (4 min)
**Show:**
```bash
# Connect to Figma via MCP
claude-mcp figma connect --token=<figma-token>

# List available files
claude-mcp figma list-files

# Access specific component
claude-mcp figma get-component --file-id=<id> --node-id=<node>
```

**Demonstrate:**
- Browse Figma files through Claude
- Select target component (e.g., a card component)
- Show how Claude can read design specs directly

#### Step 2: Component Analysis (5 min)
**Claude Prompt:**
```
Analyze this Figma component and extract:

1. Component structure and hierarchy
2. Design tokens used (colors, spacing, typography)
3. Variant configurations and properties
4. Interactive states (hover, focus, disabled)
5. Responsive behavior patterns

Generate a component specification that includes TypeScript interfaces.

Figma component: [MCP provides direct access]
```

**Expected Analysis:**
```typescript
// Generated component specification
interface CardProps {
  variant: 'default' | 'elevated' | 'outlined';
  size: 'sm' | 'md' | 'lg';
  title: string;
  description?: string;
  image?: string;
  actions?: CardAction[];
  disabled?: boolean;
}

// Design tokens extracted
const cardTokens = {
  spacing: {
    sm: 'var(--space-sm)', // 8px
    md: 'var(--space-md)', // 16px
    lg: 'var(--space-lg)'  // 24px
  },
  colors: {
    background: 'var(--color-surface)',
    border: 'var(--color-border)',
    text: 'var(--color-text-primary)'
  }
};
```

#### Step 3: Component Code Generation (6 min)
**Follow-up Prompt:**
```
Generate a complete React component based on this Figma analysis:

1. TypeScript component with proper prop types
2. CSS-in-JS or Tailwind classes using extracted design tokens
3. All variants and states from Figma
4. Accessibility attributes and keyboard navigation
5. Responsive behavior based on design specs

Make it production-ready with proper error handling.
```

**Generated Component:**
```typescript
import { FC } from 'react';
import { cva } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg border transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-surface border-border',
        elevated: 'bg-surface border-border shadow-md',
        outlined: 'bg-transparent border-2 border-border'
      },
      size: {
        sm: 'p-space-sm',
        md: 'p-space-md',
        lg: 'p-space-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

export const Card: FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  title,
  description,
  image,
  actions,
  disabled = false,
  ...props
}) => {
  return (
    <div
      className={cardVariants({ variant, size })}
      aria-disabled={disabled}
      {...props}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="space-y-space-sm">
        <h3 className="text-text-primary font-medium">
          {title}
        </h3>
        {description && (
          <p className="text-text-secondary text-sm">
            {description}
          </p>
        )}
        {actions && (
          <div className="flex gap-space-sm pt-space-sm">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="text-primary hover:text-primary-dark"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

#### Step 4: Storybook Story Generation (5 min)
**Final Prompt:**
```
Generate comprehensive Storybook stories for this Card component:

1. Default story with realistic content
2. All variant combinations with proper controls
3. Interactive examples showing different use cases
4. Accessibility testing scenarios
5. Edge cases (long text, missing props, etc.)

Include proper MDX documentation with usage guidelines.
```

**Generated Stories:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Flexible card component generated from Figma design specs.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Sample Card Title',
    description: 'This is a sample card description that shows how the component looks with typical content.',
    image: 'https://via.placeholder.com/300x200'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card variant="default" title="Default Card" />
      <Card variant="elevated" title="Elevated Card" />
      <Card variant="outlined" title="Outlined Card" />
    </div>
  )
};

// Additional stories...
```

---

## 🛠 Technical Implementation Details

### MCP Server Setup:
```json
// mcp-server-config.json
{
  "servers": {
    "figma": {
      "command": "npx",
      "args": ["@figma/mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### Figma API Integration:
```javascript
// figma-mcp-server.js
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { FigmaApi } from 'figma-api';

class FigmaMCPServer {
  constructor(accessToken) {
    this.figma = new FigmaApi({ personalAccessToken: accessToken });
    this.server = new Server({
      name: 'figma-mcp-server',
      version: '1.0.0'
    });
  }

  async getComponent(fileId, nodeId) {
    const file = await this.figma.getFile(fileId);
    const component = file.document.children.find(child => child.id === nodeId);

    return {
      name: component.name,
      type: component.type,
      styles: this.extractStyles(component),
      properties: this.extractProperties(component),
      variants: this.extractVariants(component)
    };
  }

  extractStyles(node) {
    return {
      fill: node.fills?.[0]?.color,
      stroke: node.strokes?.[0]?.color,
      typography: node.style,
      layout: {
        width: node.absoluteBoundingBox?.width,
        height: node.absoluteBoundingBox?.height,
        padding: node.paddingLeft // etc
      }
    };
  }
}
```

### Quality Assurance Checklist:
```markdown
## Generated Component Quality Check

### Design Fidelity
- [ ] Visual appearance matches Figma design
- [ ] All variants render correctly
- [ ] Spacing and typography are accurate
- [ ] Colors match design tokens

### Code Quality
- [ ] TypeScript interfaces are complete
- [ ] Props are properly validated
- [ ] CSS follows design system patterns
- [ ] Component is accessible

### Functionality
- [ ] All interactive states work
- [ ] Event handlers are implemented
- [ ] Responsive behavior matches design
- [ ] Performance is acceptable

### Documentation
- [ ] Storybook stories cover all use cases
- [ ] Usage examples are realistic
- [ ] API documentation is complete
- [ ] Accessibility notes are included
```

---

## 🏥 Open Clinic Topics

### Design-to-Code Quality:
1. "How accurate is AI-generated code compared to hand-written?"
2. "What design patterns work best with automated generation?"
3. "How do you handle complex interactions and animations?"
4. "Quality control processes for generated components?"

### Workflow Integration:
- Integrating with existing design systems
- Code review processes for generated components
- Version control and change management
- Designer-developer handoff workflows

### Technical Challenges:
- MCP setup and configuration
- Figma API limitations and rate limits
- Handling complex design system architectures
- Performance considerations for generated code

---

## 🔧 Tools & Ecosystem

### Required Tools:
- **Figma**: With proper API access and design tokens
- **Claude Code**: With MCP support enabled
- **MCP Server**: Figma integration server
- **Development environment**: React/Vue with TypeScript

### Alternative Approaches:
- **Figma to Code plugins**: Direct export from Figma
- **Design tokens platforms**: Tokens Studio, Style Dictionary
- **Code generation tools**: GitHub Copilot, Cursor AI

### Quality Tools:
- **Visual testing**: Chromatic, Percy for design validation
- **Accessibility testing**: axe-core, Lighthouse
- **Performance monitoring**: Bundle size, runtime performance

---

## 🎬 Preparation Checklist

### 1 Week Before:
- [ ] Set up Figma MCP server and test connection
- [ ] Create demo Figma file with design tokens
- [ ] Configure development environment
- [ ] Test end-to-end generation workflow

### 2-3 Days Before:
- [ ] Practice demo flow and timing
- [ ] Prepare backup examples and screenshots
- [ ] Test all generated code works correctly
- [ ] Set up screen sharing with readable code

### Day Before:
- [ ] Verify all API tokens and connections work
- [ ] Have fallback plan if MCP connection fails
- [ ] Practice troubleshooting common issues
- [ ] Prepare code examples and templates

### Day Of:
- [ ] Test internet connection and API access
- [ ] Have local backup of generated components
- [ ] Keep demo focused and well-paced
- [ ] Be ready to explain technical concepts simply

---

## 📊 ROI Analysis

### Time Savings:
- **Component development**: 60-80% reduction in initial coding time
- **Design-dev alignment**: 90% reduction in back-and-forth iterations
- **Documentation**: 70% faster story and doc creation

### Quality Improvements:
- **Design fidelity**: Exact match to design specifications
- **Consistency**: Automated adherence to design system rules
- **Accessibility**: Built-in a11y patterns from design system

### Process Benefits:
- **Faster iterations**: Quick updates when designs change
- **Better collaboration**: Designers and developers speak same language
- **Reduced errors**: Less manual interpretation of designs

---

## 🔄 Follow-up Opportunities

### Immediate Actions:
- Share MCP setup guide and configuration
- Provide Figma design system templates
- Create component generation workflow documentation

### Future Session Ideas:
- Advanced MCP integrations and custom servers
- Design system governance with automated tools
- Multi-platform code generation (React, Vue, React Native)
- AI-assisted design system evolution

### Workshop Potential:
- Hands-on MCP setup and configuration workshop
- Design system optimization for code generation
- Team workflow integration planning

---

**Estimated Impact:** Very High - Revolutionizes design-to-code workflow
**Difficulty Level:** Advanced
**Reusability:** High - Scales across entire design system