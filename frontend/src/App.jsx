import React, { useState } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import ProcessSection from './components/ProcessSection';
import FilterSection from './components/FilterSection';
import CarList from './components/CarList';
import RoomList from './components/RoomList';
import Footer from './components/Footer';
import Modal from 'react-modal'; // Import Modal

// Image imports
import xuvImage from './assets/cars/celerio.webp';
import celerioImage from './assets/cars/ertiga.webp';
import tharImage from './assets/cars/thar-1.webp';
import scorpioImage from './assets/cars/scorpio.webp';
import room1Image from './assets/rooms/room.jpg';
import room2Image from './assets/rooms/room1.jpg';

// Modal accessibility setup
Modal.setAppElement('#root');

// Mock data with image imports
const allCars = [
  { id: 1, model: 'XUV 500', year: 2021, fuel: 'Diesel', price: 1000, duration: 'per day', image: xuvImage },
  { id: 2, model: 'Celerio', year: 2020, fuel: 'Petrol', price: 600, duration: 'per day', image: celerioImage },
  { id: 3, model: 'Thar', year: 2022, fuel: 'Diesel', price: 1200, duration: 'per day', image: tharImage },
  { id: 4, model: 'Scorpio', year: 2019, fuel: 'Diesel', price: 900, duration: 'per day', image: scorpioImage },
];

const allRooms = [
  { id: 1, title: 'Single Room', location: 'City Center', price: 5000, size: 'Small', students: 1, image: room1Image },
  { id: 2, title: 'Shared Room', location: 'Near College', price: 3500, size: 'Medium', students: 2, image: room2Image },
];

const App = () => {
  const [filters, setFilters] = useState({ fuel: '', model: '', size: '', students: '' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFilterChange = ({ target: { name, value } }) =>
    setFilters(prev => ({ ...prev, [name]: value }));

  const filterData = (data, keys) =>
    data.filter(item =>
      keys.every(key =>
        !filters[key] ||
        (key === 'students'
          ? item[key] === +filters[key]
          : item[key].toLowerCase().includes(filters[key].toLowerCase()))
      )
    );

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <HeroSection />
      <ProcessSection />
      <FilterSection
        filters={[
          { name: 'fuel', label: 'Fuel Type', options: ['Petrol', 'Diesel'] },
          { name: 'model', label: 'Car Model', options: ['XUV 500', 'Celerio', 'Thar', 'Scorpio'] },
          { name: 'size', label: 'Room Size', options: ['Small', 'Medium', 'Large'] },
          { name: 'students', label: 'No. of Students', options: ['1', '2', '3', '4'] },
        ]}
        onChange={handleFilterChange}
      />
      <CarList cars={filterData(allCars, ['fuel', 'model'])} />
      <RoomList rooms={filterData(allRooms, ['size', 'students'])} />

      {/* Modal Trigger */}
      <div className="text-center my-4">
        <button onClick={openModal} className="bg-blue-600 text-white px-6 py-2 rounded shadow">
          Open Info Modal
        </button>
      </div>

      {/* React Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Information Modal"
        className="bg-white p-6 rounded shadow-md w-1/2 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Welcome to RentEazy!</h2>
        <p className="mb-4">This is a sample modal. You can use this for login, info, or booking.</p>
        <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </Modal>

      <Footer />
    </div>
  );
};

export default App;
