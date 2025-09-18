import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full">
      {/* First row: Left image with overlay, Right text box */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto">
        {/* Left big image with overlay text */}
        <div
          className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
          style={{ backgroundImage: "url('https://makeupyourownmind.com.au/wp-content/uploads/2020/08/lawfirm1.jpg')" }}
        >
          <div className="bg-black/50 text-center p-6 rounded text-white max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Legal services made simple
            </h1>
            <p className="mb-6">
              Connect with verified lawyers and manage your legal requests end-to-end.
            </p>
            <Link
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              to="/signup"
            >
              Get started
            </Link>
          </div>
        </div>

        {/* Right text box */}
        <div className="bg-gray-900 text-white flex flex-col justify-center p-10">
          <span className="uppercase text-sm tracking-widest opacity-70 mb-2">
            Our Services
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Trusted Legal Expertise
          </h2>
          <p className="opacity-80">
            We provide a wide range of professional legal services tailored to your needs.
          </p>
        </div>
      </section>

      {/* Second row: 3 image cards with hover zoom */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4">
        {/* Card 1 */}
        <Link
          to="/contracts"
          className="group relative overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src="https://makeupyourownmind.com.au/wp-content/uploads/2020/08/lawfirm1.jpg"
            alt="Contract drafting"
            className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white text-xl font-semibold">Contract drafting</h3>
          </div>
        </Link>

        {/* Card 2 */}
        <Link
          to="/consultation"
          className="group relative overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src="https://makeupyourownmind.com.au/wp-content/uploads/2020/08/lawfirm1.jpg"
            alt="Legal consultation"
            className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white text-xl font-semibold">Legal consultation</h3>
          </div>
        </Link>

        {/* Card 3 */}
        <Link
          to="/disputes"
          className="group relative overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src="https://makeupyourownmind.com.au/wp-content/uploads/2020/08/lawfirm1.jpg"
            alt="Dispute resolution"
            className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white text-xl font-semibold">Dispute resolution</h3>
          </div>
        </Link>
      </section>
    </div>
  );
}
