import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import images directly
import abhishekImg from './images/abhisheksatpathy.jpeg';
import austinImg from './images/austinsong.jpg';
import bradyImg from './images/bradypark.jpg';
import kyleImg from './images/kylevitayanuvatti.jpeg';

const teamMembers = [
  { name: 'Abhishek Satpathy', img: abhishekImg },
  { name: 'Austin Song', img: austinImg },
  { name: 'Brady Park', img: bradyImg },
  { name: 'Kyle Vitayanuvatti', img: kyleImg },
];

const AboutUs = () => {
  return (
    <section className="pt-16 pb-16 relative flex flex-col items-center justify-center w-full min-h-screen mx-auto">
      {/* Hero Section */}
      <div className="relative w-full h-[65vh] overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-[2.5rem] font-bold mt-8">About Us</h1>
          <p className="text-[1.2rem] mt-4">
            We are a student-ran business for UVA students to thrift online and sell their clothes in an healthy and 
            affordable manner, supporting the cause of second hand consumption.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[800px] w-full mt-8">
        {/* Our Story */}
        <div className="mb-8 bg-[#e2edff] p-8 rounded text-left">
          <h2 className="text-2xl font-bold text-gray-800">Making a Change</h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            We are committed to meeting all external regulations where we do business and to doing the right thing. Acting consistently and with a strong ethical compass is vital if H&M Group is to continue being a trusted company and partner, a company that is valued by customers, respected by society, and for which we are all proud to work.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            The "Our way" document sums up H&M Group's culture, values, policies and guidelines. It defines who we are, what we do and how we do it.
          </p>
        </div>

        {/* Our Team */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-5 rounded shadow-md text-center">
                <img src={member.img} alt={member.name} className="w-full h-auto rounded-full" />
                <h3 className="mt-2 text-lg font-bold">{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
