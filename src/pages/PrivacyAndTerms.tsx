import Layout from 'components/Layout';
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyAndTermsPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-[#f6f8fa] p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Legal Information</h1>

          <div role="tablist" className="tabs tabs-bordered mb-6">
            <input
              type="radio"
              name="tab"
              role="tab"
              className="tab"
              aria-label="Privacy Policy"
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content p-4 space-y-4 text-sm md:text-base text-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-900">Privacy Policy</h2>
              <p>
                At DermaQ, we prioritize your privacy. We collect personal information such as your
                name, contact details, and booking history to help you manage your skincare
                appointments more efficiently.
              </p>
              <p>
                Your data is stored securely and only accessible to authorized personnel. We do not
                sell or share your information with third parties except when required by law or for
                core service functionality.
              </p>
              <p>
                You have the right to request access to or deletion of your data at any time.
                Contact us at
                <a href="mailto:support@dermaq.app" className="text-blue-500 underline ml-1">
                  support@dermaq.app
                </a>
                .
              </p>
              <p>
                By using our app, you consent to the collection and use of your data in accordance
                with this privacy policy.
              </p>
            </div>

            <input
              type="radio"
              name="tab"
              role="tab"
              className="tab"
              aria-label="Terms & Conditions"
            />
            <div
              role="tabpanel"
              className="tab-content p-4 space-y-4 text-sm md:text-base text-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-900">Terms & Conditions</h2>
              <p>
                By using the DermaQ app, you agree to our terms and conditions. Users must provide
                accurate information when booking appointments and respect the clinic's scheduling
                policies.
              </p>
              <p>
                Missed appointments without prior notice may result in penalties or restricted
                access to the booking system. Cancellations should be made at least 24 hours in
                advance.
              </p>
              <p>
                DermaQ reserves the right to modify or discontinue the app, with or without notice,
                and to terminate accounts that violate our policies.
              </p>
              <p>
                All content within the app, including logos and designs, is the property of DermaQ
                and may not be reused without permission.
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link to="/" className="btn btn-outline btn-primary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyAndTermsPage;
