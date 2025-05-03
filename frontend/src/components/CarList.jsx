import React, { useState } from 'react';

const CarList = ({ cars }) => {
  const [expandedCar, setExpandedCar] = useState(null);

  const handleMoreClick = (id) => {
    setExpandedCar(expandedCar === id ? null : id);
  };

  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Available Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map(car => (
          <div key={car.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center group">
            {/* Car Image with hover effect */}
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src={car.image}
                alt={car.model}
                className="w-full h-40 md:h-48 object-cover rounded-md mb-3 transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-600 rounded-lg transition-all duration-300"></div>
            </div>
            {/* Car Model and Price */}
            <h3 className="text-xl font-semibold mt-3">{car.model}</h3>
            <p className="text-gray-600">{car.year} • {car.fuel}</p>
            <p className="mt-2 font-bold text-indigo-600">${car.price}/day</p>

            {/* "More" Button */}
            <button
              onClick={() => handleMoreClick(car.id)}
              className="mt-3 text-indigo-600 hover:underline"
            >
              {expandedCar === car.id ? 'Show Less' : 'More Info'}
            </button>

            {/* Display additional car information if expanded */}
            {expandedCar === car.id && (
              <div className="mt-3 text-sm text-gray-600">
                <p><strong>Fuel Type:</strong> {car.fuel}</p>
                <p><strong>Price:</strong> ${car.price}/day</p>
                <p><strong>Year:</strong> {car.year}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarList;
