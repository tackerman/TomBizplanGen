export default function PrivacyPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p>
                We collect information you provide when creating a business plan, including company details, 
                strategic goals, and SWOT analysis data. We also collect account information through our 
                authentication provider, Clerk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p>
                Your information is used to generate personalized business plans using AI technology. 
                We process your data to provide and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Storage and Security</h2>
              <p>
                We implement appropriate security measures to protect your data. Your business plan data 
                is transmitted securely and processed by Anthropic's Claude AI service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Third-Party Services</h2>
              <p>
                We use third-party services including:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Clerk for authentication</li>
                <li>Anthropic Claude for AI-powered business plan generation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information. 
                Contact us to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies</h2>
              <p>
                We use cookies and similar technologies for authentication and to improve user experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Changes to Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify users of significant changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Us</h2>
              <p>
                If you have questions about this privacy policy, please contact us through our contact page.
              </p>
            </section>

            <p className="text-sm text-gray-600 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
