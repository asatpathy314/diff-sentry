import { motion as Motion } from 'framer-motion';

const Security = () => {
  return (
    <section id="security" className="section bg-white dark:bg-gray-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image/Animation Side */}
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-primary/5 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary/5 rounded-full"></div>
              
              <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
                <div className="p-1">
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-t flex items-center">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>  
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto text-xs text-gray-500">libzma_case_study.md</div>
                  </div>
                  
                  <div className="p-4 font-mono text-xs border border-gray-200 dark:border-gray-700 rounded-b">
                    <p className="text-sm font-semibold mb-3">The libzma Attack Case Study</p>
                    
                    <ul className="space-y-2">
                      <Motion.li 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <span className="mr-2 text-danger">❌</span>
                        <span>Malicious code injected into popular compression library</span>
                      </Motion.li>
                      <Motion.li
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <span className="mr-2 text-danger">❌</span>
                        <span>Backdoor almost provided access to thousands of systems</span>
                      </Motion.li>
                      <Motion.li
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <span className="mr-2 text-danger">❌</span>
                        <span>Maintainer account compromised due to lack of resources</span>
                      </Motion.li>
                      <Motion.li
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <span className="mr-2 text-danger">❌</span>
                        <span>Insufficient funding for proper security protocols</span>
                      </Motion.li>
                      <Motion.li
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <span className="mr-2 text-secondary">✅</span>
                        <span className="text-secondary font-semibold">DiffSentry would have detected the suspicious code</span>
                      </Motion.li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Motion.div>
          
          {/* Text Content */}
          <Motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-danger bg-opacity-10 text-danger text-sm font-medium">
              Lessons from recent attacks
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">
              Why open source security matters now more than ever
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The 2023 libzma attack demonstrated how vulnerable our software supply chain can be. 
              When open source maintainers lack support, security suffers.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary bg-opacity-10 flex items-center justify-center text-secondary mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Detect Suspicious Changes</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Our AI scanning identifies unusual code patterns that could indicate a security risk, analyzing each diff for potential threats.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary bg-opacity-10 flex items-center justify-center text-secondary mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Support Critical Dependencies</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Our micro-donation system helps fund open source projects you depend on, improving security through better maintainer support.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary bg-opacity-10 flex items-center justify-center text-secondary mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Strengthen the Ecosystem</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    By combining security scanning with funding support, we create a more resilient open source ecosystem that benefits everyone.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <a href="#signup" className="btn-primary">
                Start Protecting Your Code
              </a>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default Security;