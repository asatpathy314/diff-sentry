import { motion as Motion } from 'framer-motion';

const Documentation = () => {
  return (
    <div className="pt-32 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container-custom">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Documentation</h1>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="mb-4">
              Welcome to the DiffSentry documentation.
            </p>
            <p className="mb-4">
              DiffSentry scans your code changes for potential security vulnerabilities, performance issues, and best practice violations. By analyzing code diffs, DiffSentry provides real-time feedback to developers before code is merged into production, helping teams maintain high-quality, secure codebases.
            </p>
            <p className="mb-4">
              To begin using DiffSentry, simply connect your GitHub repository through our integration page, or install our CLI tool with <code>npm install -g diffsentry</code> for local analysis.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-xl font-medium">Security Vulnerability Detection</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Automatically scans code changes for common security vulnerabilities including SQL injection, XSS attacks, authentication flaws, and insecure dependencies. DiffSentry's ML-powered engine can detect context-specific issues that traditional tools miss.
                </p>
              </li>
              <li>
                <h3 className="text-xl font-medium">Performance Impact Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Identifies code changes that may negatively impact application performance, including inefficient algorithms, memory leaks, and unnecessary resource consumption. Get predictions about how your changes might affect load times and resource usage.
                </p>
              </li>
              <li>
                <h3 className="text-xl font-medium">Code Quality Enforcement</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ensures code changes follow your team's best practices and coding standards. DiffSentry can be configured to match your organization's specific requirements and integrates with your existing CI/CD pipeline for seamless quality enforcement.
                </p>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
            <p className="mb-6">
              DiffSentry offers a RESTful API for programmatic access to all scanning features. API keys can be generated from your account dashboard and must be included in the Authorization header for all requests.
            </p>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md mb-6">
              <pre className="text-sm overflow-auto">
                <code>
                  # Example API request
                  curl -X POST https://api.diffsentry.com/v1/scan \
                    -H "Authorization: Bearer YOUR_API_KEY" \
                    -H "Content-Type: application/json" \
                    -d {"{"} 
                      "diff": "...code diff content...",
                      "repo": "username/repository",
                      "options": {"{"} 
                        "securityScan": true,
                        "performanceScan": true,
                        "qualityScan": true
                      {"}"}
                    {"}"}
                </code>
              </pre>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-md text-sm">
              <p>
                <strong>Note:</strong> The API is rate-limited to 100 requests per hour on the Free tier. Enterprise customers receive higher limits based on their subscription plan. For large-scale scanning needs, consider using our batch endpoint or setting up a webhook integration.
              </p>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default Documentation;