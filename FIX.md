# Quick Fix for API Error

If you already have the project and are getting the error:
"response_format: Extra inputs are not permitted"

## The Problem
The `json_schema` response_format feature isn't available in the stable API yet.

## The Solution
Replace the entire file `app/api/generate-plan/route.ts` with this code:

```typescript
// app/api/generate-plan/route.ts

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildBusinessPlanPrompt } from '@/lib/promptBuilder';
import { getBusinessPlanSchema } from '@/lib/schema';
import { QuestionnaireResponses, BusinessPlan } from '@/types/businessPlan';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const responses: QuestionnaireResponses = await request.json();

    // Validate required fields
    if (!responses.companyName || !responses.industry || !responses.goals) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build the prompt
    const prompt = buildBusinessPlanPrompt(responses);
    
    // Get the JSON schema
    const schema = getBusinessPlanSchema();

    // Build the full prompt with JSON schema instructions
    const fullPrompt = `${prompt}

CRITICAL: You must respond with ONLY a valid JSON object following this exact schema. Do not include any markdown code blocks, explanations, or other text - ONLY the JSON.

JSON Schema:
${JSON.stringify(schema, null, 2)}

Return the JSON now:`;

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
    });

    // Parse the JSON response
    const content = response.content[0];
    if (content.type !== 'text') {
      return NextResponse.json(
        { error: 'Unexpected response type from AI' },
        { status: 500 }
      );
    }
    let jsonText = content.text;
    
    // Remove markdown code blocks if present
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let businessPlan: BusinessPlan;
    try {
      businessPlan = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Response text:', jsonText.substring(0, 500));
      return NextResponse.json(
        { 
          error: 'Failed to parse business plan response',
          details: 'The AI returned invalid JSON. Please try again.' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      plan: businessPlan,
    });
  } catch (error: any) {
    console.error('Error generating business plan:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate business plan',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
```

## What Changed?
- Removed the `response_format` parameter (not yet available)
- Added JSON schema to the prompt instead
- Added markdown cleanup (removes ```json blocks if present)
- Added better error handling for JSON parsing

## Test It
After replacing the file:
1. Stop your dev server (Ctrl+C)
2. Run `npm run dev` again
3. Try generating a business plan

It should work now! 🎉
```
