'use client';

import { useState } from 'react';
import { BusinessPlan, QuestionnaireResponses } from '@/types/businessPlan';

export default function Home() {
  const [formData, setFormData] = useState<QuestionnaireResponses>({
    companyName: '',
    industry: '',
    companyStage: 'startup',
    goals: '',
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: '',
  });

  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBusinessPlan(null);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate business plan');
      }

      setBusinessPlan(data.plan);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Business Plan Generator
          </h1>
          <p className="text-lg text-gray-600">
            Answer a few questions and get a comprehensive business plan powered by Claude
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Acme Corporation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="SaaS, E-commerce, Manufacturing, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Stage *
              </label>
              <select
                name="companyStage"
                value={formData.companyStage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="startup">Startup</option>
                <option value="growth">Growth Stage</option>
                <option value="established">Established</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Strategic Goals *
              </label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="What are your key business goals for the next 12-24 months?"
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SWOT Analysis</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Strengths *
                  </label>
                  <textarea
                    name="strengths"
                    value={formData.strengths}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What does your company do well?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weaknesses *
                  </label>
                  <textarea
                    name="weaknesses"
                    value={formData.weaknesses}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What areas need improvement?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opportunities *
                  </label>
                  <textarea
                    name="opportunities"
                    value={formData.opportunities}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What external opportunities can you capitalize on?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Threats *
                  </label>
                  <textarea
                    name="threats"
                    value={formData.threats}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What external threats do you face?"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Generating Business Plan...' : 'Generate Business Plan'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </div>

        {businessPlan && (
          <div className="bg-white rounded-lg shadow-xl p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Business Plan for {formData.companyName}
              </h2>
            </div>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Executive Summary
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {businessPlan.executiveSummary}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Strategic Priorities
              </h3>
              <div className="space-y-4">
                {businessPlan.strategicPriorities.map((priority) => (
                  <div
                    key={priority.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {priority.title}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          priority.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : priority.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {priority.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{priority.description}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>SWOT Alignment:</strong> {priority.swotAlignment}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Rationale:</strong> {priority.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Action Plans
              </h3>
              <div className="space-y-4">
                {businessPlan.actionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {plan.initiative}
                    </h4>
                    <p className="text-gray-700 mb-3">{plan.objective}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-gray-900">Timeline:</strong>
                        <p className="text-gray-600">{plan.timeline}</p>
                      </div>
                      <div>
                        <strong className="text-gray-900">Resources:</strong>
                        <p className="text-gray-600">{plan.resources}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <strong className="text-gray-900">Success Metrics:</strong>
                      <ul className="list-disc list-inside text-gray-600 mt-1">
                        {plan.successMetrics.map((metric, idx) => (
                          <li key={idx}>{metric}</li>
                        ))}
                      </ul>
                    </div>
                    {plan.risks && plan.risks.length > 0 && (
                      <div className="mt-3">
                        <strong className="text-gray-900">Risks:</strong>
                        <ul className="list-disc list-inside text-gray-600 mt-1">
                          {plan.risks.map((risk, idx) => (
                            <li key={idx}>{risk}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Implementation Roadmap
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Immediate (0-3 months)
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {businessPlan.implementationRoadmap.immediate.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Short-term (3-6 months)
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {businessPlan.implementationRoadmap.shortTerm.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Medium-term (6-12 months)
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {businessPlan.implementationRoadmap.mediumTerm.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Long-term (12+ months)
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {businessPlan.implementationRoadmap.longTerm.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Risk Mitigation
              </h3>
              <div className="space-y-3">
                {businessPlan.riskMitigation.map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">
                      Risk: {item.risk}
                    </p>
                    <p className="text-gray-700">
                      <strong>Mitigation:</strong> {item.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
