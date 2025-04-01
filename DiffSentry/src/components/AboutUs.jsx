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
    <section className="pb-16 relative flex flex-col items-center justify-center w-full min-h-screen mx-auto">
      {/* Hero Section */}
      <div className="relative w-full aspect-[1920/1200] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        
        {/* Semi-transparent Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 opacity-70 z-10"></div>
        
        {/* Content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-20">
          <h1 className="text-[3.5rem] font-bold">About Us</h1>
          <p className="text-[1.5rem] mt-4">
            DiffSentry is an open-source software designed to support other open source repositories by 
            rounding up transactions for donations and scanning codebases for vulnerabilities.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[800px] w-full mt-8">
        {/* Our Story */}
        <div className="mb-8 bg-[#e2edff] p-8 rounded text-center">
          <h2 className="text-2xl font-bold text-gray-800">Making a Change</h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            DiffSentry was born from a simple idea: what if every digital transaction could help support the open source ecosystem? 
            Our platform allows users to round up their transactions and donate the spare change to open source projects they care about.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            By creating a sustainable funding model for open source, we help ensure that critical projects can continue to be maintained 
            and improved, benefiting the entire tech community.
          </p>
        </div>

        {/* Security Scanning */}
        <div className="mb-8 bg-[#ffe2e2] p-8 rounded text-center">
          <h2 className="text-2xl font-bold text-gray-800">Protecting Open Source</h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Beyond funding, DiffSentry is committed to the security of the open source ecosystem. Our advanced scanning tools 
            automatically detect vulnerabilities in repositories, helping maintainers identify and fix security issues before they can be exploited.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            By combining financial support with security enhancement, we're creating a stronger, more secure open source community for everyone.
          </p>
        </div>

        {/* Our Team */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">The Team</h2>
          <p className="mt-2 mb-3 text-gray-600">
            The DiffSentry Team is composed of all 2027 UVA graduates who worked together to complete this project in 24 hours for the HooHacks 2025 hackathon.
          </p>
          <p className="italic text-sm text-gray-500 mb-4">
            I am personally grateful to have worked with such a gifted team of people. Thank you to my friends! - Brady
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 max-w-[700px] mx-auto">
            {teamMembers.map((member, index) => (
              <Motion.a 
                href={member.linkedin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={index}
              >
                <div key={index} className="bg-white p-5 rounded shadow-md text-center">
                  <img src={member.img} alt={member.name} className="w-[150px] h-[150px] rounded-full mx-auto object-cover" />
                  <h3 className="mt-2 text-lg font-bold">{member.name}</h3>
                </div>
              </Motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
