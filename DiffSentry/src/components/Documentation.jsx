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
              DiffSentry scans your code changes blah blah blah 
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-xl font-medium"></h3>
                <p className="text-gray-600 dark:text-gray-300">
                </p>
              </li>
              <li>
                <h3 className="text-xl font-medium"></h3>
                <p className="text-gray-600 dark:text-gray-300">
                </p>
              </li>
              <li>
                <p className="text-gray-600 dark:text-gray-300">
                </p>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
            <p className="mb-6">
            </p>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-md text-sm">
              <p>
              </p>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default Documentation; 