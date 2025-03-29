import { motion as Motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="w-full bg-gray-900 mt-0 -mb-1">
      <footer className="bg-gray-900 text-white py-12 w-full">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <Motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              viewport={{ once: false, margin: "-100px" }}
              className="col-span-1 md:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-4">
                <a href="#" className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold">DiffSentry</span>
                </a>
              </div>
              <p className="text-gray-400 mb-4">
                Securing the open source ecosystem through AI-powered code scanning and sustainable funding.
              </p>
            </Motion.div>

            {/* Links */}
            <Motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.1, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              viewport={{ once: false, margin: "-100px" }}
              className="col-span-1"
            >
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#security" className="text-gray-400 hover:text-white transition-colors">Security Scanning</a></li>
                <li><a href="#donations" className="text-gray-400 hover:text-white transition-colors">Micro-Donations</a></li>
                <li><a href="#integrations" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </Motion.div>
            
            <Motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.2, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              viewport={{ once: false, margin: "-100px" }}
              className="col-span-1"
            >
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/api" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                <li><a href="/tutorials" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="/support" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="/status" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
              </ul>
            </Motion.div>
            
            <Motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.3, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              viewport={{ once: false, margin: "-100px" }}
              className="col-span-1"
            >
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/press" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="/legal" className="text-gray-400 hover:text-white transition-colors">Legal</a></li>
              </ul>
            </Motion.div>
          </div>
          
          {/* Social Media Links */}
          <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            viewport={{ once: false, margin: "-50px" }}
            className="mt-12 flex justify-start"
          >
            <div className="flex space-x-4">
              <a href="https://twitter.com/diffsentry" className="text-gray-400 hover:text-primary transition-colors">
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://github.com/diffsentry" className="text-gray-400 hover:text-primary transition-colors">
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.465.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com/company/diffsentry" className="text-gray-400 hover:text-primary transition-colors">
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </a>
            </div>
          </Motion.div>
          
          {/* Bottom Bar */}
          <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.4, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            viewport={{ once: false, margin: "-50px" }}
            className="mt-4 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          >
            <div className="flex flex-col items-center md:items-start">
              <p className="text-gray-500 text-sm">
                &copy; {currentYear} DiffSentry. All rights reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </Motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Footer; 