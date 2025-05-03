import React from 'react';

const steps = [
  { title: 'Register', desc: 'Create your account in seconds.' },
  { title: 'Browse', desc: 'Explore rooms and cars with filters.' },
  { title: 'Book', desc: 'Confirm your booking easily.' },
  { title: 'Enjoy', desc: 'Use your booking and pay securely.' },
];

const ProcessSection = () => (
  <section className="py-12 bg-white text-center">
    <h2 className="text-4xl font-semibold text-gray-900 mb-12">How It Works</h2>
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 px-4">
      {steps.map((step, idx) => (
        <div key={idx} className="flex-1 p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
          <div className="text-indigo-600 text-4xl font-bold mb-4">
            <span className="text-gray-800">{idx + 1}</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
          <p className="text-gray-700">{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ProcessSection;
