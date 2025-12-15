// lib/schema.ts

export function getBusinessPlanSchema() {
  return {
    type: "object",
    properties: {
      executiveSummary: {
        type: "string",
        description: "A comprehensive 3-4 paragraph executive summary of the business plan"
      },
      strategicPriorities: {
        type: "array",
        description: "3-5 key strategic priorities based on SWOT analysis",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for this priority"
            },
            title: {
              type: "string",
              description: "Clear, concise title for the strategic priority"
            },
            description: {
              type: "string",
              description: "Detailed description of the strategic priority"
            },
            swotAlignment: {
              type: "string",
              enum: ["strength", "weakness", "opportunity", "threat"],
              description: "Primary SWOT factor this priority addresses"
            },
            priority: {
              type: "string",
              enum: ["high", "medium", "low"],
              description: "Priority level"
            },
            rationale: {
              type: "string",
              description: "Why this is a priority given the company's situation"
            }
          },
          required: ["id", "title", "description", "swotAlignment", "priority", "rationale"]
        }
      },
      actionPlans: {
        type: "array",
        description: "Detailed action plans for implementing strategic priorities",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for this action plan"
            },
            initiative: {
              type: "string",
              description: "Name of the initiative"
            },
            objective: {
              type: "string",
              description: "Clear objective this initiative aims to achieve"
            },
            timeline: {
              type: "string",
              description: "Expected timeline for completion"
            },
            resources: {
              type: "string",
              description: "Resources required (budget, team, tools)"
            },
            successMetrics: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Measurable success metrics"
            },
            risks: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Potential risks and challenges"
            }
          },
          required: ["id", "initiative", "objective", "timeline", "resources", "successMetrics"]
        }
      },
      implementationRoadmap: {
        type: "object",
        description: "Phased implementation roadmap",
        properties: {
          immediate: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Actions to take in 0-3 months"
          },
          shortTerm: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Actions to take in 3-6 months"
          },
          mediumTerm: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Actions to take in 6-12 months"
          },
          longTerm: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Actions to take beyond 12 months"
          }
        },
        required: ["immediate", "shortTerm", "mediumTerm", "longTerm"]
      },
      riskMitigation: {
        type: "array",
        description: "Key risks and mitigation strategies",
        items: {
          type: "object",
          properties: {
            risk: {
              type: "string",
              description: "Description of the risk"
            },
            mitigation: {
              type: "string",
              description: "Strategy to mitigate this risk"
            }
          },
          required: ["risk", "mitigation"]
        }
      }
    },
    required: ["executiveSummary", "strategicPriorities", "actionPlans", "implementationRoadmap", "riskMitigation"]
  };
}
