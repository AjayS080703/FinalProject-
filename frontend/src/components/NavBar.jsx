import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faKey, faUserPlus, faDoorOpen, faTimes, faBuilding, faSlidersH, faChevronDown, faUser, faEnvelope, faLock, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState('user');
    const [formType, setFormType] = useState('login');
    const [registerType, setRegisterType] = useState('car'); // For admin form choice
    const modalRef = useRef(null);
    const [advertisementText, setAdvertisementText] = useState([
        'Discover Amazing Cars and Rooms for Rent!',
        'Special Offers This Week - Don\'t Miss Out!',
        'Find Your Perfect Rental with RentEazy Today!',
    ]);
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [carFilters, setCarFilters] = useState({ type: '', brand: '', price: '' });
    const [roomFilters, setRoomFilters] = useState({ type: '', size: '', price: '' });

    // New state variables for user registration
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [college, setCollege] = useState('');

    // useCallback for memoizing event handlers
    const handleClickOutside = useCallback((event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    }, [setShowModal]);

    const handleModalClose = useCallback(() => setShowModal(false), [setShowModal]);
    const handleModalOpen = useCallback(() => setShowModal(true), [setShowModal]);
    const handleRoleSelect = useCallback((selectedRole) => setRole(selectedRole), [setRole]);
    const handleFormTypeChange = useCallback((type) => setFormType(type), [setFormType]);
    const handleRegisterTypeChange = useCallback((type) => setRegisterType(type), [setRegisterType]);
    const toggleFilter = useCallback(() => setShowFilter((prev) => !prev), []);

    const handleCarFilterChange = useCallback((e) => {
        const { name, value } = e.target;
        setCarFilters((prev) => ({ ...prev, [name]: value }));
        // In a real application, you would trigger a search/filter update here
        console.log('Car Filters:', { ...carFilters, [name]: value });
    }, [carFilters, setCarFilters]);

    const handleRoomFilterChange = useCallback((e) => {
        const { name, value } = e.target;
        setRoomFilters((prev) => ({ ...prev, [name]: value }));
        // In a real application, you would trigger a search/filter update here
        console.log('Room Filters:', { ...roomFilters, [name]: value });
    }, [roomFilters, setRoomFilters]);

    // New handle functions for user registration fields
    const handleFullNameChange = useCallback((e) => setFullName(e.target.value), [setFullName]);
    const handleEmailChange = useCallback((e) => setEmail(e.target.value), [setEmail]);
    const handlePasswordChange = useCallback((e) => setPassword(e.target.value), [setPassword]);
    const handleCollegeChange = useCallback((e) => setCollege(e.target.value), [setCollege]);

    // useEffect for handling outside clicks on modal
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    // useEffect for advertisement text slider
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % advertisementText.length);
        }, 3000); // Change text every 3 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [advertisementText.length]);

    // Modal Animation Variants
    const modalVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
        exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } },
    };

    // Slide Animation for Advertisement
    const slideVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    // Form input animation variants
    const formInputVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    const getRoleIcon = (selectedRole) => {
        return selectedRole === 'admin' ? faBuilding : faUser;
    };

    return (
        <header className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 shadow-lg sticky top-0 z-50">
            {/* Advertisement Bar */}
            <div className="bg-indigo-100 py-2 text-indigo-700 text-center overflow-hidden">
                <motion.div
                    className="relative h-6" // Set a fixed height to contain the sliding text
                    style={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    <AnimatePresence initial={false} mode="wait">
                        <motion.span
                            key={currentAdIndex}
                            variants={slideVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute inset-0 inline-block w-full"
                            style={{
                                left: `${-currentAdIndex * 100}%`,
                                transition: 'transform 0.5s ease-in-out',
                            }}
                        >
                            {advertisementText[currentAdIndex]}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Top Nav */}
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <div className="text-3xl font-bold text-white tracking-tight">
                    <span className="text-yellow-400">Rent</span>Eazy
                </div>

                <div className="flex-1 mx-8 max-w-xl relative">
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-6a7 7 0 10-14 0 7 7 0 0014 0z"></path></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search cars, apartments, villas..."
                            className="shadow-inner focus:ring-indigo-200 focus:border-indigo-300 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5"
                        />
                    </div>
                    {/* Filter Button */}
                    <button
                        onClick={toggleFilter}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 hover:text-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 flex items-center"
                    >
                        <FontAwesomeIcon icon={faSlidersH} className="mr-2" />
                        Filters
                        <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-xs" />
                    </button>

                    {/* Filter Dropdown */}
                    <AnimatePresence>
                        {showFilter && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 mt-2 w-full bg-white rounded-md shadow-lg z-10 border border-gray-200"
                            >
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter Options</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Car Filters */}
                                        <div>
                                            <h4 className="text-md font-semibold text-gray-800 mb-3">Car Filters</h4>
                                            <div className="mb-3">
                                                <label htmlFor="carType" className="block text-gray-600 text-sm font-bold mb-1">Car Type:</label>
                                                <select
                                                    id="carType"
                                                    name="type"
                                                    onChange={handleCarFilterChange}
                                                    className="shadow-sm focus:ring-indigo-200 focus:border-indigo-300 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                                                >
                                                    <option value="">Any</option>
                                                    <option value="sedan">Sedan</option>
                                                    <option value="suv">SUV</option>
                                                    <option value="hatchback">Hatchback</option>
                                                    {/* Add more car types */}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="carBrand" className="block text-gray-600 text-sm font-bold mb-1">Brand:</label>
                                                <input
                                                    type="text"
                                                    id="carBrand"
                                                    name="brand"
                                                    onChange={handleCarFilterChange}
                                                    placeholder="e.g., Toyota, Honda"
                                                    className="shadow-sm focus:ring-indigo-200 focus:border-indigo-300 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="carPrice" className="block text-gray-600 text-sm font-bold mb-1">Max Price:</label>
                                                <input
                                                    type="number"
                                                    id="carPrice"
                                                    name="price"
                                                    onChange={handleCarFilterChange}
                                                    placeholder="₹"
                                                    className="shadow-sm focus:ring-indigo-200 focus:border-indigo-300 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                                                />
                                            </div>
                                        </div>

                                        {/* Room Filters */}
                                        <div>
                                            <h4 className="text-md font-semibold text-gray-800 mb-3">Room Filters</h4>
                                            <div className="mb-3">
                                                <label htmlFor="roomType" className="block text-gray-600 text-sm font-bold mb-1">Room Type:</label>
                                                <select
                                                    id="roomType"
                                                    name="type"
                                                    onChange={handleRoomFilterChange}
                                                    className="shadow-sm focus:ring-indigo-200 focus:border-indigo-300 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                                                >
                                                    <option value="">Any</option>
                                                    <option value="apartment">Apartment</option>
                                                    <option value="house">House</option>
                                                    <option value="pg">PG/Hostel</option>
                                                    {/* Add more room types */}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="roomSize" className="block text-gray-600 text-sm font-bold mb-1">Size (sq ft):</label>
                                                <input
                                                    type="text"
                                                    id="roomSize"
                                                    name="size"
                                                    onChange={handleRoomFilterChange}
                                                    placeholder="e.g., 500, 1000"
                                                    className="shadow-sm focus:ring-indigo-200 focus:border-indigo-300 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="roomPrice" className="block text-gray-600 text-sm font-bold mb-1">Max Rent:</label>
                                                <input
                                                    type="number"
                                                    id="roomPrice"
                                                    name="price"
                                                    onChange={handleRoomFilterChange}
                                                    placeholder="₹"
                                                    className="shadow-sm focus:ring-indigo-200 focus:border-indigo-300 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleModalOpen}
                        className="group relative h-10 w-28 overflow-hidden rounded-md bg-yellow-400 text-indigo-700 font-semibold hover:bg-yellow-500 transition-all duration-300"
                    >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full bg-yellow-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                            <FontAwesomeIcon icon={faKey} className="mr-2" />
                            Login
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-colors duration-300">
                            <FontAwesomeIcon icon={faKey} className="mr-2" />
                            Login
                        </span>
                    </button>

                    <button
                        onClick={handleModalOpen}
                        className="group relative h-10 w-28 overflow-hidden rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-300"
                    >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full bg-indigo-700 transform  group-hover:translate-x-0 transition-transform duration-300">
                            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                            Sign Up
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-colors duration-300">
                            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                            Sign Up
                        </span>
                    </button>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex justify-center items-center z-50 transition-opacity"
                    >
                        <div
                            ref={modalRef}
                            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md" // Reduced padding
                        >
                            <div className="flex justify-between items-center mb-4"> {/* Reduced margin */}
                                <h3 className="text-2xl font-bold text-indigo-600 tracking-tight">
                                    <FontAwesomeIcon icon={faDoorOpen} className="mr-2" />
                                    Welcome to RentEazy
                                </h3>
                                <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700 text-lg focus:outline-none">
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>

                            {/* Role Toggle */}
                            <div className="flex justify-center gap-3 mb-4"> {/* Reduced margin */}
                                <button
                                    onClick={() => handleRoleSelect('admin')}
                                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition duration-200 ease-in-out ${role === 'admin'
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <FontAwesomeIcon icon={getRoleIcon('admin')} className="mr-2" />
                                    Admin
                                </button>
                                <button
                                    onClick={() => handleRoleSelect('user')}
                                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition duration-200 ease-in-out ${role === 'user'
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <FontAwesomeIcon icon={getRoleIcon('user')} className="mr-2" />
                                    User
                                </button>
                            </div>

                            {/* Admin Form */}
                            {role === 'admin' && (
                                <div>
                                    <div className="flex justify-center gap-3 mb-3"> {/* Reduced margin */}
                                        <button
                                            onClick={() => handleRegisterTypeChange('car')}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold focus:outline-none transition duration-200 ease-in-out ${registerType === 'car'
                                                ? 'bg-blue-500 text-white shadow-sm'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            <FontAwesomeIcon icon={faCar} className="mr-1" />
                                            Car
                                        </button>
                                        <button
                                            onClick={() => handleRegisterTypeChange('room')}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold focus:outline-none transition duration-200 ease-in-out ${registerType === 'room'
                                                ? 'bg-blue-500 text-white shadow-sm'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            <FontAwesomeIcon icon={faBuilding} className="mr-1" />
                                            Room
                                        </button>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                        {formType === 'login' ? 'Admin Login' : `Admin ${registerType === 'car' ? 'Car' : 'Room'} Sign Up`}
                                    </h4>

                                    {/* Shared Inputs */}
                                    <AnimatePresence>
                                        {formType === 'signup' && (
                                            <>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
                                                            type="text"
                                                            placeholder="Name"
                                                            className="input-field pl-10"
                                                            value={fullName}
                                                            onChange={handleFullNameChange}
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={registerType === 'car' ? faCar : faBuilding} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
                                                            type="text"
                                                            placeholder={`Your ${registerType === 'car' ? 'Car Model' : 'Room Size'}`}
                                                            className="input-field pl-10"
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
                                                            type="email"
                                                            placeholder="Email"
                                                            className="input-field pl-10"
                                                            value={email}
                                                            onChange={handleEmailChange}
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
                                                            type="password"
                                                            placeholder="Password"
                                                            className="input-field pl-10"
                                                            value={password}
                                                            onChange={handlePasswordChange}
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <button className="submit-btn">Register</button>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                    <AnimatePresence>
                                        {formType === 'login' && (
                                            <>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
                                                            type="email"
                                                            placeholder="Email"
                                                            className="input-field pl-10"
                                                            value={email}
                                                            onChange={handleEmailChange}
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
                                                            type="password"
                                                            placeholder="Password"
                                                            className="input-field pl-10"
                                                            value={password}
                                                            onChange={handlePasswordChange}
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <button className="submit-btn">Login</button>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* User Form */}
                            {role === 'user' && (
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">{formType === 'login' ? 'User Login' : 'User Sign Up'}</h4>
                                    <AnimatePresence>
                                        {formType === 'signup' && (
                                            <>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
                                                            type="text"
                                                            placeholder="Full Name"
                                                            className="input-field pl-10"
                                                            value={fullName}
                                                            onChange={handleFullNameChange}
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
type="email"
                                                            placeholder="Email"
                                                            className="input-field pl-10"
                                                            value={email}
                                                            onChange={handleEmailChange}
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
                                                            type="password"
                                                            placeholder="Password"
                                                            className="input-field pl-10"
                                                            value={password}
                                                            onChange={handlePasswordChange}
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={faGraduationCap} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
                                                            type="text"
                                                            placeholder="College Enrollment ID"
                                                            className="input-field pl-10"
                                                            value={college}
                                                            onChange={handleCollegeChange}
                                                        />
                                                    </div>
                                                </motion.div>

                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <button className="submit-btn">Sign Up</button>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                    <AnimatePresence>
                                        {formType === 'login' && (
                                            <>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
                                                            type="email"
                                                            placeholder="Email"
                                                            className="input-field pl-10"
                                                            value={email}
                                                            onChange={handleEmailChange}
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <div className="relative">
                                                        <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                        <input
                                                            type="password"
                                                            placeholder="Password"
                                                            className="input-field pl-10"
                                                            value={password}
                                                            onChange={handlePasswordChange}
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div variants={formInputVariants} initial="hidden" animate="visible">
                                                    <button className="submit-btn">Login</button>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* Switch Login/Signup */}
                            <div className="flex justify-between mt-4 text-sm text-gray-600"> {/* Reduced margin */}
                                <button
                                    onClick={() => handleFormTypeChange('login')}
                                    className={`focus:outline-none hover:text-indigo-700 transition duration-200 ease-in-out ${formType === 'login' ? 'font-semibold text-indigo-700' : ''}`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => handleFormTypeChange('signup')}
                                    className={`focus:outline-none hover:text-indigo-700 transition duration-200 ease-in-out ${formType === 'signup' ? 'font-semibold text-indigo-700' : ''}`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tailwind CSS Styles (using JSS-like syntax within React component) */}
            <style jsx>{`
        .input-field {
          @apply w-full px-4 py-3 mb-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm; /* Reduced margin-bottom */
        }
        .submit-btn {
          @apply w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out;
        }
        .animate-slide {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }
      `}</style>
        </header>
    );
};

export default NavBar;
