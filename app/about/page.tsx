export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About</h1>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Business Plan Generator is an AI-powered tool that helps entrepreneurs and business leaders 
              create comprehensive, actionable business plans tailored to their specific goals and market conditions.
            </p>
            <p className="mb-4">
              Using advanced AI technology powered by Claude, we analyze your company's strengths, weaknesses, 
              opportunities, and threats to generate strategic priorities, action plans, and implementation roadmaps.
            </p>
            <p>
              Whether you're starting a new venture, seeking funding, or planning strategic initiatives, 
              our platform provides professional business plans in minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
