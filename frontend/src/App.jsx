import React, { useState } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import ProcessSection from './components/ProcessSection';
import FilterSection from './components/FilterSection';
import CarList from './components/CarList';
import RoomList from './components/RoomList';
import Footer from './components/Footer';

// Image imports
import xuvImage from './assets/cars/celerio.webp';
import celerioImage from './assets/cars/ertiga.webp';
import tharImage from './assets/cars/thar-1.webp';
import scorpioImage from './assets/cars/scorpio.webp';
import room1Image from './assets/rooms/room.jpg';
import room2Image from './assets/rooms/room1.jpg';

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

  const handleFilterChange = ({ target: { name, value } }) =>
    setFilters(prev => ({ ...prev, [name]: value }));

  const filterData = (data, keys) =>
    data.filter(item =>
      keys.every(key => !filters[key] || (key === 'students' ? item[key] === +filters[key] : item[key].toLowerCase().includes(filters[key].toLowerCase())))
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
      <Footer />
    </div>
  );
};

export default App;
