import React from 'react';
import { motion as Motion } from 'framer-motion';

// Import images directly
import abhishekImg from './images/abhisheksatpathy.jpeg';
import austinImg from './images/austinsong.jpg';
import bradyImg from './images/bradypark.jpg';
import kyleImg from './images/kylevitayanuvatti.jpeg';
import heroImg from './images/diffsentryhero.png';

const teamMembers = [
  { name: 'Abhishek Satpathy', img: abhishekImg, linkedin: "https://www.linkedin.com/in/abhishek-satpathy-1b2b84270/" },
  { name: 'Austin Song', img: austinImg, linkedin: "https://www.linkedin.com/in/austinjsong/" },
  { name: 'Brady Park', img: bradyImg, linkedin: "https://www.linkedin.com/in/brady-park-9a5469208/" },
  { name: 'Kyle Vitayanuvatti', img: kyleImg, linkedin: "https://www.linkedin.com/in/kyle-vitayanuvatti/"},
];

const AboutUs = () => {
  return (
    <section className="pb-16 relative flex flex-col items-center justify-center w-full min-h-screen mx-auto bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative w-full aspect-[1920/1200] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0 opacity-60"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-900 via-gray-800/80 to-gray-900 z-10"></div>
        
        {/* Content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full max-w-4xl px-4">
          <Motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold text-white mb-2"
          >
            About Us
          </Motion.h1>
          <Motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-xl mt-6 text-gray-200 leading-relaxed">
              DiffSentry is an open-source software designed to support other open source repositories by 
              rounding up transactions for donations and scanning codebases for vulnerabilities.
            </p>
          </Motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl w-full mt-16 px-4">
        {/* Our Story */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-indigo-400">Making a Change</h2>
          <div className="w-16 h-1 bg-indigo-500 mt-2 mb-4"></div>
          <p className="mt-4 text-gray-300 leading-relaxed">
            DiffSentry was born from a simple idea: what if every digital transaction could help support the open source ecosystem? 
            Our platform allows users to round up their transactions and donate the spare change to open source projects they care about.
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            By creating a sustainable funding model for open source, we help ensure that critical projects can continue to be maintained 
            and improved, benefiting the entire tech community.
          </p>
        </Motion.div>

        {/* Security Scanning */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-rose-400">Protecting Open Source</h2>
          <div className="w-16 h-1 bg-rose-500 mt-2 mb-4"></div>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Beyond funding, DiffSentry is committed to the security of the open source ecosystem. Our advanced scanning tools 
            automatically detect vulnerabilities in repositories, helping maintainers identify and fix security issues before they can be exploited.
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            By combining financial support with security enhancement, we're creating a stronger, more secure open source community for everyone.
          </p>
        </Motion.div>

        {/* Our Team */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">The Team</h2>
          <div className="w-16 h-1 bg-cyan-500 mb-4"></div>
          <p className="mt-2 mb-3 text-gray-300">
            The DiffSentry Team is composed of 4 UVA students who worked together to complete the bulk of this project in 24 hours for the HooHacks 2025 hackathon.
          </p>
          <p className="italic text-sm text-gray-400 mb-8">
            I am personally grateful to have worked with such a gifted team of people. Thank you to my friends! - Brady
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <Motion.a 
                href={member.linkedin}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all hover:border-cyan-500/50">
                  <div className="w-48 h-48 mx-auto overflow-hidden rounded-full my-4 border-2 border-cyan-500/30">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    <div className="flex items-center mt-2">
                      <svg className="w-4 h-4 text-cyan-400 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                      </svg>
                      <span className="text-gray-400 text-sm">LinkedIn</span>
                    </div>
                  </div>
                </div>
              </Motion.a>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
