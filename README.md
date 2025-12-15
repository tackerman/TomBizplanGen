# AI Business Plan Generator

A Next.js application that generates comprehensive business plans using Claude's structured output API. Users answer a questionnaire covering company information and SWOT analysis, and Claude generates a detailed, actionable business plan in JSON format.

## Features

- **Structured Questionnaire**: Collects company information, goals, and SWOT analysis
- **Guaranteed JSON Structure**: Uses Claude's `json_schema` feature for reliable, typed output
- **Comprehensive Business Plans**: Generates:
  - Executive Summary
  - Strategic Priorities (with SWOT alignment)
  - Detailed Action Plans
  - Implementation Roadmap (phased timeline)
  - Risk Mitigation Strategies
- **Beautiful UI**: Clean, responsive interface with Tailwind CSS
- **Type-Safe**: Full TypeScript implementation

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Claude Sonnet 4 via Anthropic SDK
- **API Pattern**: Structured JSON output with strict schema enforcement

## Prerequisites

- Node.js 18+ and npm
- An Anthropic API key ([get one here](https://console.anthropic.com/))

## Setup Instructions

### 1. Clone and Install

```bash
cd business-plan-generator
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
business-plan-generator/
├── app/
│   ├── api/
│   │   └── generate-plan/
│   │       └── route.ts          # API endpoint for plan generation
│   ├── globals.css                # Global styles with Tailwind
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main questionnaire and results page
├── lib/
│   ├── promptBuilder.ts           # Builds the prompt from questionnaire data
│   └── schema.ts                  # Defines the JSON schema for structured output
├── types/
│   └── businessPlan.ts            # TypeScript types for all data structures
├── .env.example                   # Environment variable template
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## How It Works

### 1. Questionnaire Collection

The user fills out a form with:
- Company name, industry, stage
- Strategic goals
- SWOT analysis (Strengths, Weaknesses, Opportunities, Threats)

### 2. Structured Output Generation

The app sends this data to Claude with a **strict JSON schema** that defines the exact structure of the business plan:

```typescript
{
  executiveSummary: string,
  strategicPriorities: Array<{
    id: string,
    title: string,
    description: string,
    swotAlignment: 'strength' | 'weakness' | 'opportunity' | 'threat',
    priority: 'high' | 'medium' | 'low',
    rationale: string
  }>,
  actionPlans: Array<{...}>,
  implementationRoadmap: {...},
  riskMitigation: Array<{...}>
}
```

### 3. Guaranteed Valid Output

Claude's `json_schema` feature ensures:
- ✅ Valid JSON (no parsing errors)
- ✅ All required fields present
- ✅ Correct types (strings, arrays, enums)
- ✅ Type-safe on the frontend

### 4. Display Results

The structured data is rendered in a clean, organized format with sections for priorities, action plans, timelines, and risk mitigation.

## Key Implementation Details

### API Route (`app/api/generate-plan/route.ts`)

```typescript
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 8000,
  messages: [{ role: 'user', content: prompt }],
  response_format: {
    type: 'json_schema',
    json_schema: {
      name: 'business_plan',
      strict: true,
      schema: getBusinessPlanSchema()
    }
  }
});

const businessPlan: BusinessPlan = JSON.parse(response.content[0].text);
```

The `strict: true` flag ensures Claude adheres exactly to the schema.

### Schema Definition (`lib/schema.ts`)

The schema uses standard JSON Schema format with:
- Type definitions (`string`, `array`, `object`)
- Required fields
- Enums for fixed values
- Descriptions for each field to guide Claude

### Prompt Engineering (`lib/promptBuilder.ts`)

The prompt:
1. Provides clear context about the company
2. Structures the SWOT information
3. Gives explicit instructions for each section
4. Emphasizes specificity and actionability

## Customization Ideas

### Add More Sections

Extend the schema and types to include:
- Financial projections
- Competitive analysis
- Market sizing
- Team structure

### Multi-Step Wizard

Break the questionnaire into multiple pages with progress indicator.

### Export Functionality

Add PDF or DOCX export using libraries like `jsPDF` or `docx`.

### Regenerate Sections

Allow users to regenerate specific sections (e.g., just the action plans).

### Save Plans

Add a database (PostgreSQL/Supabase) to save and retrieve plans.

### Industry Templates

Pre-fill SWOT considerations based on industry selection.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |

## Troubleshooting

### "Missing required fields" error

Ensure all required form fields are filled out before submission.

### API key errors

- Verify your API key is correct in `.env.local`
- Check you have API credits available at https://console.anthropic.com/
- Restart the dev server after changing environment variables

### JSON parsing errors

If using an older Anthropic SDK version, the `json_schema` feature may not be available. Update to the latest version:

```bash
npm install @anthropic-ai/sdk@latest
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add `ANTHROPIC_API_KEY` environment variable
4. Deploy

### Other Platforms

Works on any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with `npm run build && npm start`

## Cost Considerations

- **Claude Sonnet 4**: ~$3 per million input tokens, ~$15 per million output tokens
- Average business plan: ~2,000 input tokens + ~6,000 output tokens = ~$0.10 per plan
- Consider adding rate limiting for production use

## License

MIT

## Contributing

Contributions welcome! Feel free to open issues or submit pull requests.

## Learn More

- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Structured Outputs Guide](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)
