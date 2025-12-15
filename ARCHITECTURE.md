# Architecture Overview

## System Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Questionnaire Form                     │    │
│  │  • Company Name                                     │    │
│  │  • Industry                                         │    │
│  │  • Goals                                            │    │
│  │  • SWOT (Strengths, Weaknesses, Opportunities,     │    │
│  │    Threats)                                         │    │
│  └─────────────────┬──────────────────────────────────┘    │
│                    │ Submit Form                            │
│                    ▼                                         │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Next.js Frontend (React)                  │    │
│  │         app/page.tsx (Client Component)            │    │
│  │                                                     │    │
│  │  • Collects form data                              │    │
│  │  • Makes POST request to /api/generate-plan        │    │
│  │  • Displays loading state                          │    │
│  │  • Renders structured business plan                │    │
│  └─────────────────┬──────────────────────────────────┘    │
└────────────────────┼──────────────────────────────────────┘
                     │ HTTP POST
                     │ JSON payload
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js API Route                         │
│            app/api/generate-plan/route.ts                   │
│                                                              │
│  1. Receive questionnaire data                              │
│  2. Validate required fields                                │
│  3. Build comprehensive prompt                              │
│     └── lib/promptBuilder.ts                                │
│  4. Get JSON schema definition                              │
│     └── lib/schema.ts                                       │
│  5. Call Anthropic API                                      │
│                                                              │
└─────────────────────┬───────────────────────────────────────┘
                      │ API Request
                      │ + Prompt
                      │ + JSON Schema
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   Anthropic API                              │
│              (Claude Sonnet 4)                               │
│                                                              │
│  ┌───────────────────────────────────────────────────┐     │
│  │  Request with json_schema response_format:         │     │
│  │  {                                                 │     │
│  │    type: "json_schema",                           │     │
│  │    json_schema: {                                 │     │
│  │      name: "business_plan",                       │     │
│  │      strict: true,                                │     │
│  │      schema: { /* Full schema */ }                │     │
│  │    }                                              │     │
│  │  }                                                │     │
│  └───────────────────────────────────────────────────┘     │
│                                                              │
│  Claude processes:                                           │
│  • Analyzes company situation                                │
│  • Synthesizes SWOT into strategies                         │
│  • Generates actionable plans                               │
│  • STRICTLY adheres to JSON schema                          │
│  • Returns valid, typed JSON                                │
│                                                              │
└─────────────────────┬───────────────────────────────────────┘
                      │ JSON Response
                      │ (guaranteed valid)
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js API Route                         │
│                                                              │
│  1. Parse JSON response (no try/catch needed!)              │
│  2. Return BusinessPlan object                              │
│                                                              │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP Response
                      │ JSON BusinessPlan
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │          Business Plan Display                      │    │
│  │                                                     │    │
│  │  📄 Executive Summary                              │    │
│  │  🎯 Strategic Priorities (3-5)                     │    │
│  │  ✅ Action Plans (detailed)                        │    │
│  │  📅 Implementation Roadmap                         │    │
│  │  ⚠️  Risk Mitigation                               │    │
│  │                                                     │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Key Components

### 1. Frontend (`app/page.tsx`)
- **Type**: Client Component (`'use client'`)
- **Responsibilities**:
  - Render questionnaire form
  - Manage form state
  - Handle form submission
  - Display loading states
  - Render structured business plan results
- **Technologies**: React, TypeScript, Tailwind CSS

### 2. API Route (`app/api/generate-plan/route.ts`)
- **Type**: Server-side API endpoint
- **Responsibilities**:
  - Receive and validate questionnaire data
  - Build comprehensive prompt from user input
  - Define JSON schema for output
  - Call Anthropic API with structured output parameters
  - Return parsed business plan
- **Technologies**: Next.js API Routes, Anthropic SDK

### 3. Type Definitions (`types/businessPlan.ts`)
- **Purpose**: TypeScript interfaces for type safety
- **Defines**:
  - `QuestionnaireResponses`: User input structure
  - `BusinessPlan`: Complete plan structure
  - `StrategicPriority`: Individual priority format
  - `ActionPlan`: Action item structure

### 4. Schema Builder (`lib/schema.ts`)
- **Purpose**: JSON Schema definition for Claude
- **Returns**: Complete JSON Schema object with:
  - Field types (string, array, object)
  - Required vs optional fields
  - Enum constraints
  - Descriptions for Claude's guidance

### 5. Prompt Builder (`lib/promptBuilder.ts`)
- **Purpose**: Constructs effective prompt from questionnaire
- **Includes**:
  - Company context
  - SWOT analysis
  - Strategic goals
  - Clear instructions for each section
  - Tone and format guidance

## Data Flow

```
User Input (Form)
      ↓
QuestionnaireResponses (TypeScript)
      ↓
Prompt Builder → Comprehensive Prompt
      ↓
API Route → Anthropic API
      ↓
Claude processes with JSON Schema constraints
      ↓
Valid JSON Response
      ↓
BusinessPlan Object (TypeScript)
      ↓
React Rendering → Beautiful UI
```

## Why This Architecture?

### Type Safety
- TypeScript throughout
- Schema matches types exactly
- No runtime type errors

### Guaranteed Structure
- JSON Schema enforcement
- No parsing failures
- Predictable output format

### Separation of Concerns
- Frontend: UI and UX
- API Route: Business logic
- Schema: Data structure
- Prompt: AI instructions

### Scalability
- Easy to add new sections
- Simple to modify structure
- Clear extension points

### Maintainability
- Each component has single responsibility
- Types catch errors at compile time
- Schema is self-documenting

## Environment Variables

| Variable | Location | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | Server-side only | Authenticate with Anthropic API |

**Security Note**: API key is only used server-side in API routes, never exposed to client.

## Deployment Architecture

```
GitHub Repository
      ↓
Vercel Deployment
      ↓
┌─────────────────────────────────┐
│  Static Assets (Frontend)        │
│  • HTML, CSS, JS bundles        │
│  • Served from CDN              │
└─────────────────────────────────┘
      ↓
┌─────────────────────────────────┐
│  Serverless Functions           │
│  • API Routes                   │
│  • Auto-scaling                 │
│  • Regional edge deployment     │
└─────────────────────────────────┘
      ↓
┌─────────────────────────────────┐
│  Anthropic API (External)       │
│  • Claude Sonnet 4              │
│  • Global infrastructure        │
└─────────────────────────────────┘
```

## Performance Characteristics

- **Form Loading**: Instant (static rendering)
- **Questionnaire Submission**: ~15-30 seconds
  - Network latency: ~100ms
  - Claude processing: ~15-30s (varies by complexity)
  - Response parsing: <10ms
- **Results Rendering**: Instant (React state update)

## Error Handling

```
┌─────────────────────┐
│   User Action       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Validation Error?   │  → Show form errors
└──────┬──────────────┘
       │ ✓
       ▼
┌─────────────────────┐
│ API Call Fails?     │  → Show error message
└──────┬──────────────┘
       │ ✓
       ▼
┌─────────────────────┐
│ Schema Violation?   │  → Cannot happen! (strict mode)
└──────┬──────────────┘
       │ ✓
       ▼
┌─────────────────────┐
│ Success: Display    │
│ Business Plan       │
└─────────────────────┘
```

## Future Enhancements

1. **Database Integration**
   - Save business plans
   - Version history
   - User accounts

2. **Export Features**
   - PDF generation
   - DOCX export
   - CSV data export

3. **Collaboration**
   - Share plans with team
   - Comments and feedback
   - Real-time editing

4. **Advanced Analytics**
   - Track plan progress
   - KPI dashboards
   - Goal achievement metrics

5. **Multi-language Support**
   - i18n for UI
   - Plan generation in multiple languages

## Security Considerations

✅ API key stored server-side only
✅ Input validation on both client and server
✅ Rate limiting (consider adding for production)
✅ No sensitive data stored (stateless)
⚠️  Consider adding authentication for production
⚠️  Add rate limiting per user/IP
⚠️  Implement CORS policies
