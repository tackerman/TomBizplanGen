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

    // Call Claude API with structured output
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      // @ts-ignore - TypeScript definitions may not be up to date with latest API
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'business_plan',
          strict: true,
          schema: schema,
        },
      },
    });

    // Parse the JSON response
    const businessPlan: BusinessPlan = JSON.parse(response.content[0].text);

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
