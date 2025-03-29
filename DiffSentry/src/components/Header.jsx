import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <header className="relative fixed w-full bg-white bg-opacity-90 backdrop-blur-md shadow-sm dark:bg-[#24292e] dark:bg-opacity-90 z-50">
      <div className="container-custom py-6"> {/* changed from py-4 to py-6 */}
        <div className="flex items-center">
          {/* Logo container: moved to absolute position */}
          <Motion.div 
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-4 flex items-center space-x-2" 
          >
            <Link to="/" className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-lg bg-[#0366d6] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold">DiffSentry</span>
            </Link>
          </Motion.div>
          
          {/* Updated Desktop Nav: flex-grow to center and increased spacing */}
          <div className="hidden md:flex flex-grow justify-center space-x-16">
            <Motion.a 
              custom={1}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              href="#features" 
              className="font-medium hover:text-[#0366d6] transition-colors"
            >
              Features
            </Motion.a>
            <Motion.a 
              custom={2}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              href="#security" 
              className="font-medium hover:text-[#0366d6] transition-colors"
            >
              Security
            </Motion.a>
            <Motion.a 
              custom={3}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              href="#donations" 
              className="font-medium hover:text-[#0366d6] transition-colors"
            >
              Donations
            </Motion.a>
            <Motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <Link to="/documentation" className="font-medium hover:text-[#0366d6] transition-colors">
                Documentation
              </Link>
            </Motion.div>
          </div>

          <div className="absolute right-4 flex items-center space-x-6"> {/* Updated buttons container */}
            <Motion.a 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              href="#signup" 
              className="hidden md:inline-flex btn-primary"
            >
              Get Started
            </Motion.a>
            <Motion.a 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              href="https://github.com/diffsentry" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden md:flex items-center"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6 mr-2">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.465.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z"></path>
              </svg>
              GitHub
            </Motion.a>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </Motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Updated Mobile Menu: center align links */}
      {isMenuOpen && (
        <Motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden py-6 bg-white dark:bg-gray-800 shadow-inner" 
        >
          <div className="container-custom text-center space-y-4">
            <Motion.a 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              href="#features" 
              className="block font-medium py-2 hover:text-[#0366d6] transition-colors"
            >
              Features
            </Motion.a>
            <Motion.a 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              href="#security" 
              className="block font-medium py-2 hover:text-[#0366d6] transition-colors"
            >
              Security
            </Motion.a>
            <Motion.a 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              href="#donations" 
              className="block font-medium py-2 hover:text-[#0366d6] transition-colors"
            >
              Donations
            </Motion.a>
            <Motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              <Link 
                to="/documentation" 
                className="block font-medium py-2 hover:text-[#0366d6] transition-colors"
              >
                Documentation
              </Link>
            </Motion.div>
            <Motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="pt-2 flex flex-col space-y-2"
            >
              <a href="#signup" className="btn-primary text-center">Get Started</a>
              <a 
                href="https://github.com/diffsentry" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center py-2 border border-gray-300 rounded-md"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.465.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z"></path>
                </svg>
                GitHub
              </a>
            </Motion.div>
          </div>
        </Motion.div>
      )}
    </header>
  );
};

export default Header;