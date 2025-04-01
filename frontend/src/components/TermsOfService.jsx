import { motion as Motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="bg-white py-16">
      <div className="container-custom">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Introduction</h2>
            <p className="mb-6 text-gray-700">
              Welcome to DiffSentry. These Terms of Service govern your access to and use of the DiffSentry website, 
              browser extension, and services. By using our services, you agree to these terms. Please read them carefully.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Using Our Services</h2>
            <p className="mb-4 text-gray-700">
              DiffSentry provides tools for secure code review and micro-donations to open source projects. 
              You must follow any policies made available to you within the services.
            </p>
            <p className="mb-6 text-gray-700">
              You may use our services only as permitted by law. We may suspend or stop providing our services to you 
              if you do not comply with our terms or policies or if we are investigating suspected misconduct.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Privacy and Copyright Protection</h2>
            <p className="mb-6 text-gray-700">
              DiffSentry's privacy policies explain how we treat your personal data and protect your privacy when 
              you use our services. By using our services, you agree that DiffSentry can use such data in accordance 
              with our privacy policies.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">4. Your Content in Our Services</h2>
            <p className="mb-6 text-gray-700">
              Our services allow you to upload, submit, store, send, and receive content. You retain ownership of any 
              intellectual property rights that you hold in that content. When you upload, submit, store, send, or receive 
              content to or through our services, you give DiffSentry a worldwide license to use, host, store, reproduce, 
              modify, create derivative works, communicate, publish, publicly perform, publicly display, and distribute such 
              content for the limited purpose of operating, promoting, and improving our services.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">5. Micro-Donations</h2>
            <p className="mb-6 text-gray-700">
              DiffSentry facilitates micro-donations to open source projects. By making a donation through our platform, 
              you authorize us to process the payment and distribute the funds according to your specified instructions. 
              We are not responsible for how recipients use donations received through our platform.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">6. Modifying and Terminating Our Services</h2>
            <p className="mb-6 text-gray-700">
              We are constantly changing and improving our services. We may add or remove functionalities or features, 
              and we may suspend or stop a service altogether. You can stop using our services at any time. DiffSentry 
              may also stop providing services to you, or add or create new limits to our services at any time.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">7. Liability for Our Services</h2>
            <p className="mb-6 text-gray-700">
              To the extent permitted by law, DiffSentry and its suppliers and distributors will not be responsible for 
              lost profits, revenues, or data, financial losses, or indirect, special, consequential, exemplary, or 
              punitive damages.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">8. Changes to These Terms</h2>
            <p className="mb-6 text-gray-700">
              We may modify these terms or any additional terms that apply to a service to, for example, reflect changes 
              to the law or changes to our services. You should look at the terms regularly. We'll post notice of 
              modifications to these terms on this page.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">9. Contact Us</h2>
            <p className="mb-6 text-gray-700">
              If you have any questions about these Terms of Service, please contact us at support@diffsentry.com.
            </p>

            <p className="text-gray-600 mt-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default TermsOfService; 