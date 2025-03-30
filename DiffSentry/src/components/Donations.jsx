import { motion as Motion } from 'framer-motion';

const Donations = () => {
  return (
    <section id="donations" className="section bg-gray-50 dark:bg-gray-900 scroll-mt-32">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <Motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            viewport={{ once: false, margin: "-100px" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary bg-opacity-10 text-secondary text-sm font-medium">
              Funding open source sustainably
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">
              Micro-donations that make a macro impact
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Enable spare change donations on your online purchases to support the open source projects 
              you rely on. It's a simple way to support the ecosystem of modern software.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: false, margin: "-100px" }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="text-3xl font-bold text-primary mb-2">72%</div>
                <p className="text-gray-600 dark:text-gray-400">
                  of critical open source projects are maintained by just one or two developers
                </p>
              </Motion.div>
              
              <Motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false, margin: "-100px" }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="text-3xl font-bold text-primary mb-2">$2.5M+</div>
                <p className="text-gray-600 dark:text-gray-400">
                  projected donations to open source maintainers through our platform
                </p>
              </Motion.div>
            </div>
            
            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: false, margin: "-100px" }}
              className="pt-4"
            >
              <a 
                href="https://chrome.google.com/webstore/category/extensions" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary text-xl px-6 py-3"
                title="This links to your Chrome extensions page"
              >
                Start Supporting Open Source
              </a>
            </Motion.div>
          </Motion.div>
          
          {/* Visual Side */}
          <Motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <div className="relative">
              <Motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: false }}
                className="absolute -top-10 -right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"
              ></Motion.div>
              
              <div className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Your Donation Impact</h3>
                  <span className="text-secondary font-medium">Last month</span>
                </div>
                
                <div className="space-y-6">
                  {/* Project 1 */}
                  <Motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    className="flex items-center p-4 border border-gray-100 dark:border-gray-700 rounded-lg"
                  >
                    <div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">OpenSSL</span>
                        <span className="text-primary">$1.75</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Encryption & security
                      </div>
                    </div>
                  </Motion.div>
                  
                  {/* Project 2 */}
                  <Motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: false, margin: "-50px" }}
                    className="flex items-center p-4 border border-gray-100 dark:border-gray-700 rounded-lg"
                  >
                    <div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">MongoDB Driver</span>
                        <span className="text-primary">$0.84</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Database connectivity
                      </div>
                    </div>
                  </Motion.div>
                  
                  {/* Project 3 */}
                  <Motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: false, margin: "-50px" }}
                    className="flex items-center p-4 border border-gray-100 dark:border-gray-700 rounded-lg"
                  >
                    <div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">React Router</span>
                        <span className="text-primary">$1.32</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Frontend routing
                      </div>
                    </div>
                  </Motion.div>
                  
                  <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: false, margin: "-50px" }}
                    className="pt-4 border-t border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex justify-between text-lg font-medium">
                      <span>Total Donations</span>
                      <span className="text-primary">$5.27</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Your spare change is making a real difference to the developers who maintain critical infrastructure.
                    </p>
                  </Motion.div>
                </div>
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default Donations;