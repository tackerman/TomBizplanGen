// lib/promptBuilder.ts

import { QuestionnaireResponses } from '@/types/businessPlan';

export function buildBusinessPlanPrompt(responses: QuestionnaireResponses): string {
  return `You are an expert strategic business consultant. Generate a comprehensive, actionable business plan based on the following company assessment.

Company Information:
- Company Name: ${responses.companyName}
- Industry: ${responses.industry}
- Company Stage: ${responses.companyStage}

Strategic Goals:
${responses.goals}

SWOT Analysis:

Strengths:
${responses.strengths}

Weaknesses:
${responses.weaknesses}

Opportunities:
${responses.opportunities}

Threats:
${responses.threats}

Instructions:
1. Create a compelling executive summary that synthesizes the company's position and the strategic plan
2. Identify 3-5 strategic priorities that leverage strengths, address weaknesses, capitalize on opportunities, and mitigate threats
3. Develop detailed action plans with clear timelines, resource requirements, and success metrics
4. Create a phased implementation roadmap (immediate, short-term, medium-term, long-term)
5. Identify key risks and provide specific mitigation strategies

Make the plan:
- Specific to this company's situation
- Actionable with clear next steps
- Realistic given the stated strengths and weaknesses
- Focused on achieving the stated goals
- Professional and suitable for presentation to stakeholders

Generate the business plan now.`;
}
