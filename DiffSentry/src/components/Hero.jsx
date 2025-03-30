import { motion as Motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-secondary rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text Content */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary bg-opacity-10 text-primary text-sm font-medium">
              <span className="flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Security meets open source support
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary">Security</span> scanning for every commit you make
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              DiffSentry scans each commit for vulnerabilities in real-time, protecting your codebase from security threats 
              while allowing you to support open source projects with micro-donations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center">
              <Motion.a 
                href="#signup" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-center py-3"
              >
                Get Started for Free
              </Motion.a>
              <Motion.a 
                href="#demo" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Demo
              </Motion.a>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-700">
              <p className="text-base text-gray-700 mb-2">Trusted by engineering teams at</p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-4">
                <img src="https://placehold.co/150x40/DDDDDD/333333?text=GitPub" alt="GitPub" className="h-8 opacity-60 hover:opacity-100 transition translate-y-1" />
                <img src="https://placehold.co/150x40/DDDDDD/333333?text=FordVPN" alt="FordVPN" className="h-8 opacity-60 hover:opacity-100 transition translate-y-1" />
                <img src="https://placehold.co/150x40/DDDDDD/333333?text=CanesStreet" alt="CanesStreet" className="h-8 opacity-60 hover:opacity-100 transition translate-y-1" />
                <img src="https://placehold.co/150x40/DDDDDD/333333?text=CoStart" alt="CoStart" className="h-8 opacity-60 hover:opacity-100 transition translate-y-1" />
              </div>
            </div>
          </Motion.div>
          
          {/* Hero Image/Animation */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl filter blur-xl"></div>
              <div className="relative shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="bg-white dark:bg-gray-800 p-1">
                  <div className="flex items-center p-2 bg-gray-100 dark:bg-gray-900 rounded">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-xs text-gray-500 mr-[30px]">DiffSentry Security Scan</div>
                  </div>
                  <div className="mt-2 p-4 space-y-4 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs overflow-hidden">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-primary/30 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-danger/30 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="rounded bg-success bg-opacity-20 text-green-800 dark:text-green-400 p-4 text-sm border border-green-200 dark:border-green-900">
                      ✓ Open source support donation configured
                    </div>
                    
                    <div className="rounded bg-danger bg-opacity-20 text-red-800 dark:text-red-400 p-4 text-sm border border-red-200 dark:border-red-900">
                      ⚠ Potential vulnerability in dependency: libcrypto@1.2.3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;