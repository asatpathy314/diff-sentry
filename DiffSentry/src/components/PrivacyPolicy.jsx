import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <section className="pt-20 pb-16 bg-gray-50">
      <div className="max-w-[800px] mx-auto px-4">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
          
          {/* Information We Collect */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-gray-700 mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li><span className="font-medium">Account Details:</span> When you register or use our services, we may collect your name, email address, and other contact information.</li>
              <li><span className="font-medium">Payment Information:</span> To process donations and transaction round-ups, we collect payment details. This data is handled securely and processed via trusted third-party providers.</li>
              <li><span className="font-medium">Usage Data:</span> We gather data on how you interact with DiffSentry (e.g., logs, browser details, and usage patterns) to improve our services.</li>
            </ul>
            
            <h3 className="text-lg font-medium text-gray-700 mb-2">Repository and Code Data</h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Vulnerability Scanning:</span> With your consent, DiffSentry scans your repositories and Git diffs for vulnerabilities using Gemini's API. This process accesses repository data solely to perform vulnerability assessments and provide remediation recommendations. We do not store your code beyond what is necessary for these operations.
            </p>
          </div>
          
          {/* How We Use Your Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><span className="font-medium">Service Provision:</span> To deliver, maintain, and enhance DiffSentry, including processing transactions and conducting security scans.</li>
              <li><span className="font-medium">Communication:</span> To send service updates, respond to inquiries, and notify you about important changes.</li>
              <li><span className="font-medium">Security and Compliance:</span> To monitor our systems, ensure compliance with applicable laws, and protect against fraudulent or malicious activities.</li>
              <li><span className="font-medium">Analytics:</span> To analyze usage trends and improve our platform, ensuring a better overall user experience.</li>
            </ul>
          </div>
          
          {/* How We Share Your Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. How We Share Your Information</h2>
            <p className="text-gray-600 mb-3">We do not sell your personal data. We may share your information with:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><span className="font-medium">Service Providers:</span> Trusted third parties (including payment processors, cloud hosting services, and Gemini's API for vulnerability scanning) that assist us in providing our services. These providers are bound by confidentiality agreements and are prohibited from using your data for other purposes.</li>
              <li><span className="font-medium">Legal Requirements:</span> When required by law, regulation, or legal process, we may disclose your information.</li>
            </ul>
          </div>
          
          {/* Data Security */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Data Security</h2>
            <p className="text-gray-600 mb-3">We implement robust security measures to protect your data, including:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><span className="font-medium">Encryption:</span> Sensitive data is transmitted and stored using secure encryption protocols.</li>
              <li><span className="font-medium">Access Controls:</span> Only authorized personnel have access to your personal information.</li>
              <li><span className="font-medium">Regular Audits:</span> We periodically review and update our security practices to ensure continued protection of your data.</li>
            </ul>
          </div>
          
          {/* Data Retention */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Data Retention</h2>
            <p className="text-gray-600">
              We retain your personal information only as long as necessary to provide our services and to meet legal obligations. Once no longer needed, your data is securely deleted or anonymized.
            </p>
          </div>
          
          {/* Your Rights */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Your Rights</h2>
            <p className="text-gray-600 mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><span className="font-medium">Access:</span> Request a copy of the personal data we hold about you.</li>
              <li><span className="font-medium">Correct:</span> Request corrections to any inaccurate or incomplete information.</li>
              <li><span className="font-medium">Delete:</span> Ask for the deletion of your personal data, subject to legal or operational constraints.</li>
              <li><span className="font-medium">Opt-Out:</span> Choose to opt out of receiving promotional communications.</li>
            </ul>
            <p className="text-gray-600 mt-3">
              To exercise these rights or if you have any questions regarding this policy, please contact us at:
              <br />
              Email: <a href="mailto:support@diffsentry.com" className="text-blue-500 hover:underline">support@diffsentry.com</a>
            </p>
          </div>
          
          {/* Changes to This Privacy Policy */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Changes to This Privacy Policy</h2>
            <p className="text-gray-600">
              We may update this policy periodically. Significant changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy regularly.
            </p>
          </div>
          
          {/* Contact Us */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              <br />
              Email: <a href="mailto:support@diffsentry.com" className="text-blue-500 hover:underline">support@diffsentry.com</a>
              <br />
              Address: DiffSentry, University of Virginia, Charlottesville, VA 22904
            </p>
          </div>
          
          <p className="text-gray-600 text-center text-sm mt-8">
            By using DiffSentry, you agree to the collection and use of your information as described in this Privacy Policy.
          </p>
          
          <div className="flex justify-center mt-10">
            <Link to="/" className="text-blue-500 hover:underline">
              Return to Homepage
            </Link>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
