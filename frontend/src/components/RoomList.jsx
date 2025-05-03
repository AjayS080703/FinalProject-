import React, { useState } from 'react';

const RoomList = ({ rooms }) => {
  const [expandedRoom, setExpandedRoom] = useState(null);

  const handleMoreClick = (id) => {
    setExpandedRoom(expandedRoom === id ? null : id);
  };

  return (
    <section className="py-8 px-4 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4 text-center">Available Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center group">
            {/* Room Image with hover effect */}
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-40 md:h-48 object-cover rounded-md mb-3 transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-600 rounded-lg transition-all duration-300"></div>
            </div>
            {/* Room Title and Price */}
            <h3 className="text-xl font-semibold mt-3">{room.title}</h3>
            <p className="text-gray-600">{room.location}</p>
            <p className="mt-2 font-bold text-indigo-600">${room.price}/month</p>

            {/* "More" Button */}
            <button
              onClick={() => handleMoreClick(room.id)}
              className="mt-3 text-indigo-600 hover:underline"
            >
              {expandedRoom === room.id ? 'Show Less' : 'More Info'}
            </button>

            {/* Display additional room information if expanded */}
            {expandedRoom === room.id && (
              <div className="mt-3 text-sm text-gray-600">
                <p><strong>Size:</strong> {room.size}</p>
                <p><strong>Students:</strong> {room.students} students</p>
                <p><strong>Location:</strong> {room.location}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomList;
