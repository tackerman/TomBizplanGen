// types/businessPlan.ts

export interface QuestionnaireResponses {
  companyName: string;
  industry: string;
  companyStage: string;
  goals: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}

export interface StrategicPriority {
  id: string;
  title: string;
  description: string;
  swotAlignment: 'strength' | 'weakness' | 'opportunity' | 'threat';
  priority: 'high' | 'medium' | 'low';
  rationale: string;
}

export interface ActionPlan {
  id: string;
  initiative: string;
  objective: string;
  timeline: string;
  resources: string;
  successMetrics: string[];
  risks: string[];
}

export interface BusinessPlan {
  executiveSummary: string;
  strategicPriorities: StrategicPriority[];
  actionPlans: ActionPlan[];
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
