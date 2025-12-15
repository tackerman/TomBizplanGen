# Extending the Business Plan Schema

This guide shows how to add new sections or fields to your business plan.

## Example: Adding Financial Projections

### 1. Update TypeScript Types (`types/businessPlan.ts`)

Add the new interface:

```typescript
export interface FinancialProjections {
  yearOneRevenue: string;
  yearTwoRevenue: string;
  yearThreeRevenue: string;
  profitabilityTimeline: string;
  keyAssumptions: string[];
  fundingNeeds: string;
}

export interface BusinessPlan {
  executiveSummary: string;
  strategicPriorities: StrategicPriority[];
  actionPlans: ActionPlan[];
  financialProjections: FinancialProjections;  // ADD THIS
  implementationRoadmap: {
    immediate: string[];
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  riskMitigation: Array<{
    risk: string;
    mitigation: string;
  }>;
}
```

### 2. Update Schema (`lib/schema.ts`)

Add to the properties object:

```typescript
export function getBusinessPlanSchema() {
  return {
    type: "object",
    properties: {
      executiveSummary: { ... },
      strategicPriorities: { ... },
      actionPlans: { ... },
      
      // ADD THIS SECTION
      financialProjections: {
        type: "object",
        description: "3-year financial projections and funding requirements",
        properties: {
          yearOneRevenue: {
            type: "string",
            description: "Projected revenue for year 1"
          },
          yearTwoRevenue: {
            type: "string",
            description: "Projected revenue for year 2"
          },
          yearThreeRevenue: {
            type: "string",
            description: "Projected revenue for year 3"
          },
          profitabilityTimeline: {
            type: "string",
            description: "When the company expects to become profitable"
          },
          keyAssumptions: {
            type: "array",
            items: { type: "string" },
            description: "Key assumptions underlying these projections"
          },
          fundingNeeds: {
            type: "string",
            description: "Funding requirements and use of funds"
          }
        },
        required: ["yearOneRevenue", "profitabilityTimeline", "keyAssumptions"]
      },
      
      implementationRoadmap: { ... },
      riskMitigation: { ... }
    },
    required: [
      "executiveSummary",
      "strategicPriorities",
      "actionPlans",
      "financialProjections",  // ADD TO REQUIRED
      "implementationRoadmap",
      "riskMitigation"
    ]
  };
}
```

### 3. Update Prompt (`lib/promptBuilder.ts`)

Add instructions for the new section:

```typescript
export function buildBusinessPlanPrompt(responses: QuestionnaireResponses): string {
  return `You are an expert strategic business consultant...

Instructions:
1. Create a compelling executive summary...
2. Identify 3-5 strategic priorities...
3. Develop detailed action plans...
4. Create financial projections for years 1-3 based on the company stage and goals  // ADD THIS
5. Create a phased implementation roadmap...
6. Identify key risks...

Generate the business plan now.`;
}
```

### 4. Display in UI (`app/page.tsx`)

Add a new section to display the data:

```typescript
{businessPlan && (
  <div className="bg-white rounded-lg shadow-xl p-8 space-y-8">
    {/* Existing sections... */}
    
    {/* ADD THIS SECTION */}
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Financial Projections
      </h3>
      <div className="border border-gray-200 rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Year 1 Revenue</p>
            <p className="text-lg font-semibold text-gray-900">
              {businessPlan.financialProjections.yearOneRevenue}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Year 2 Revenue</p>
            <p className="text-lg font-semibold text-gray-900">
              {businessPlan.financialProjections.yearTwoRevenue}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Year 3 Revenue</p>
            <p className="text-lg font-semibold text-gray-900">
              {businessPlan.financialProjections.yearThreeRevenue}
            </p>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Profitability Timeline:
          </p>
          <p className="text-gray-600">
            {businessPlan.financialProjections.profitabilityTimeline}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Key Assumptions:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            {businessPlan.financialProjections.keyAssumptions.map((assumption, idx) => (
              <li key={idx}>{assumption}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Funding Needs:
          </p>
          <p className="text-gray-600">
            {businessPlan.financialProjections.fundingNeeds}
          </p>
        </div>
      </div>
    </section>
    
    {/* Rest of sections... */}
  </div>
)}
```

## More Extension Ideas

### Add Competitive Analysis
```typescript
competitiveAnalysis: {
  type: "object",
  properties: {
    competitors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          strengths: { type: "array", items: { type: "string" } },
          weaknesses: { type: "array", items: { type: "string" } },
          marketShare: { type: "string" }
        }
      }
    },
    competitiveAdvantage: { type: "string" }
  }
}
```

### Add Team Structure
```typescript
teamStructure: {
  type: "object",
  properties: {
    keyRoles: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          responsibilities: { type: "string" },
          hiringPriority: { type: "string", enum: ["immediate", "short-term", "long-term"] }
        }
      }
    },
    currentGaps: { type: "array", items: { type: "string" } }
  }
}
```

### Add Marketing Strategy
```typescript
marketingStrategy: {
  type: "object",
  properties: {
    targetCustomers: { type: "string" },
    channels: { type: "array", items: { type: "string" } },
    messaging: { type: "string" },
    budget: { type: "string" },
    metrics: { type: "array", items: { type: "string" } }
  }
}
```

## Tips for Good Schema Design

1. **Be Specific**: Use descriptive field names and descriptions
2. **Use Enums**: For fixed choices (priority levels, stages, etc.)
3. **Required vs Optional**: Mark truly essential fields as required
4. **Arrays for Lists**: Use arrays when Claude should generate multiple items
5. **Nested Objects**: Group related fields logically
6. **Test Incrementally**: Add one section at a time and test

## Example: Adding to Questionnaire

If your new section needs user input:

```typescript
// In app/page.tsx, add to formData state:
const [formData, setFormData] = useState({
  // ... existing fields
  currentRevenue: '',
  targetMarket: '',
  // etc.
});

// Add form fields:
<div>
  <label>Current Annual Revenue *</label>
  <input
    type="text"
    name="currentRevenue"
    value={formData.currentRevenue}
    onChange={handleInputChange}
    required
  />
</div>

// Update prompt builder to include this data:
Current Revenue: ${responses.currentRevenue}
```

## Testing Your Changes

1. Update types → Check TypeScript errors are gone
2. Update schema → Verify JSON structure
3. Update prompt → Test if Claude understands the instructions
4. Update UI → Verify display looks good
5. Test end-to-end → Generate a full plan

## Common Issues

**Claude doesn't follow the schema**
→ Make sure `strict: true` is set in the API call
→ Check descriptions are clear
→ Verify all required fields are marked

**Missing data in output**
→ Check if field is marked as required in schema
→ Update prompt to explicitly mention this field

**TypeScript errors**
→ Make sure types match schema exactly
→ Run `npm run build` to catch type issues

Happy extending! 🚀
