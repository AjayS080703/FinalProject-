// frontend/src/components/NavBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';

Modal.setAppElement('#root');

const AuthModal = ({ isOpen, onRequestClose, onAuthSubmit }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isHost, setIsHost] = useState(false);

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setIsHost(false); // Reset host selection when toggling auth mode
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 1000,
                },
                content: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 'auto',
                    bottom: 0,
                    width: '80%',
                    maxWidth: '400px',
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '0',
                    outline: 'none',
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out',
                },
            }}
            contentLabel={isLogin ? 'Login Modal' : 'Sign Up Modal'}
            className="auth-modal"
            bodyOpenClassName="auth-modal-open"
        >
            <motion.div
                initial={{ x: -400 }}
                animate={{ x: 0 }}
                exit={{ x: -400 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="flex flex-col h-full"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {isLogin ? 'Login' : 'Sign Up'} as {isHost ? 'Host' : 'User'}
                    </h2>
                    <button onClick={onRequestClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
                {isLogin ? (
                    <Login onAuthSubmit={onAuthSubmit} onRequestClose={onRequestClose} setIsLogin={setIsLogin} setIsHost={setIsHost} />
                ) : (
                    <Register onAuthSubmit={onAuthSubmit} onRequestClose={onRequestClose} setIsLogin={setIsLogin} setIsHost={setIsHost} />
                )}
            </motion.div>
        </Modal>
    );
};

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const menuRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userMobile, setUserMobile] = useState('');
    const [authToken, setAuthToken] = useState(null);
    const [isUserHost, setIsUserHost] = useState(false);
    const [userRole, setUserRole] = useState('user');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsAuthModalOpen(false);
    };

    const openAuthModal = () => {
        setIsAuthModalOpen(true);
        setIsMenuOpen(false);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    const handleAuthSubmit = (token, mobile, isHost, role) => {
        setAuthToken(token);
        setUserMobile(mobile);
        setIsLoggedIn(true);
        setIsUserHost(isHost);
        setUserRole(role);
        localStorage.setItem('authToken', token);
        localStorage.setItem('userMobile', mobile);
        localStorage.setItem('isHost', isHost);
        localStorage.setItem('userRole', role);
    };

    const handleLogout = () => {
        setAuthToken(null);
        setUserMobile('');
        setIsLoggedIn(false);
        setIsUserHost(false);
        setUserRole('user');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userMobile');
        localStorage.removeItem('isHost');
        localStorage.removeItem('userRole');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedMobile = localStorage.getItem('userMobile');
        const storedIsHost = localStorage.getItem('isHost');
        const storedRole = localStorage.getItem('userRole');
        if (storedToken) {
            setAuthToken(storedToken);
            setUserMobile(storedMobile || '');
            setIsLoggedIn(true);
            setIsUserHost(storedIsHost === 'true');
            setUserRole(storedRole || 'user');
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        document.body.classList.toggle('modal-open', isAuthModalOpen);
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isAuthModalOpen]);

    return (
        <header className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={toggleMenu} className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md p-2 transition duration-300 ease-in-out hover:bg-indigo-600">
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </button>
                    <div className="text-2xl font-bold text-white tracking-tight">
                        <span className="text-yellow-400">Rent</span>Eazy
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search for vehicles, rooms..."
                            className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                        </div>
                    </div>
                </div>
                <div className="relative">
                    {isLoggedIn ? (
                        <div className="flex items-center text-white">
                            <FontAwesomeIcon icon={faUserCircle} size="lg" className="mr-2" />
                            <span>{userMobile} ({userRole})</span>
                            <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition duration-300 ease-in-out shadow-sm">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={openAuthModal}
                            className="px-4 py-2 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition duration-300 ease-in-out shadow-sm"
                        >
                            Login / Sign Up
                        </button>
                    )}
                </div>
            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onRequestClose={closeAuthModal}
                onAuthSubmit={handleAuthSubmit}
            />

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg p-4 z-50"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Menu</h2>
                            <button onClick={toggleMenu} className="text-gray-400 hover:text-white focus:outline-none">
                                <FontAwesomeIcon icon={faBars} size="lg" />
                            </button>
                        </div>
                        <nav className="space-y-2">
                            {!isLoggedIn && (
                                <button onClick={openAuthModal} className="block py-2 hover:text-yellow-400 focus:outline-none">
                                    Login / Sign Up
                                </button>
                            )}
                            {isLoggedIn && (
                                <button onClick={() => console.log('Open User Profile from Menu')} className="block py-2 hover:text-yellow-400 focus:outline-none">
                                    User Profile
                                </button>
                            )}
                            <button className="block py-2 hover:text-yellow-400 focus:outline-none">Become a Host</button>
                            <button className="block py-2 hover:text-yellow-400 focus:outline-none">Host Vehicles Policies</button>
                            <button className="block py-2 hover:text-yellow-400 focus:outline-none">Host Room Policies</button>
                            <button className="block py-2 hover:text-yellow-400 focus:outline-none">Help & Support</button>
                            <button className="block py-2 hover:text-yellow-400 focus:outline-none">Blogs</button>
                            {isLoggedIn && (
                                <button onClick={handleLogout} className="block py-2 hover:text-yellow-400 focus:outline-none">
                                    Logout
                                </button>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default NavBar;