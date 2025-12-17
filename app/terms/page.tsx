export default function TermsPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Business Plan Generator, you accept and agree to be bound by 
                these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use of Service</h2>
              <p>
                Our service provides AI-generated business plans for informational and planning purposes. 
                You are responsible for reviewing and adapting any generated content to your specific needs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Intellectual Property</h2>
              <p>
                The business plans generated through our service are provided to you for your use. 
                You retain ownership of the information you provide and the generated business plans.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Disclaimer</h2>
              <p>
                AI-generated business plans are provided "as is" without warranties. While we strive for 
                accuracy, you should verify all information and consult with professional advisors before 
                making business decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Limitation of Liability</h2>
              <p>
                Business Plan Generator shall not be liable for any damages arising from the use or 
                inability to use our service or generated content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the service 
                after changes constitutes acceptance of the modified terms.
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
