import React, { useState } from 'react';

const Login = ({ onAuthSubmit, onRequestClose, setIsLogin }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isHost, setIsHost] = useState(false);

    const handleIdentifierChange = (e) => {
        setIdentifier(e.target.value);
        setLoginError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setLoginError('');
    };

    const handleHostToggle = (e) => {
        setIsHost(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password, userType: isHost ? 'host' : 'user' }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful', data);
                onAuthSubmit(data.token, data.user.mobile || data.user.email, data.user.isHost, data.user.role);
                onRequestClose();
            } else {
                console.error('Login failed', data.message || 'Invalid credentials.');
                setLoginError(data.message || 'Invalid credentials.');
            }
        } catch (error) {
            console.error('Error during login', error);
            setLoginError('Network error during login.');
        }
    };

    return (
        <div className="bg-gray-100 p-8 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Log In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="identifier" className="block text-gray-700 text-sm font-bold mb-2">
                        Mobile Number or Email
                    </label>
                    <input
                        type="text"
                        id="identifier"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your mobile number or email"
                        value={identifier}
                        onChange={handleIdentifierChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>

                <div className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" onChange={handleHostToggle} checked={isHost} />
                    <label className="ml-2 text-gray-700 text-sm">Log In as Host</label>
                </div>

                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Continue to Login
                </button>

                {loginError && <p className="text-red-500 text-xs italic mt-1 text-center">{loginError}</p>}

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-gray-100 px-2 text-gray-500">or</span>
                    </div>
                </div>

                <a
                    href="http://localhost:5000/api/auth/google"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
                >
                    <svg className="mr-2 -ml-1 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.19-2.25H12V16.36h6.65c-.3 1.83-1.88 3.1-3.84 3.1-2.8 0-5.12-2.27-5.12-5.07S9.12 7.29 11.92 7.29c1.13 0 2.12.4 2.88 1.16l1.98-1.98c-1.2-1.1-2.72-1.76-4.56-1.76C6.62 4.51 3 7.86 3 12.25c0 4.39 3.62 7.74 8.92 7.74 2.29 0 4.25-.76 5.71-2.03l-1.98 1.98c-1.1 1.05-2.55 1.69-4.03 1.69-3.34 0-6.15-2.75-6.15-6.15s2.81-6.15 6.15-6.15c1.76 0 3.29.66 4.5 1.78l2.08-2.08c-1.12-1.09-2.53-1.75-4.01-1.75C6.35 5.26 3 8.59 3 12.25z"/>
                    </svg>
                    Continue with Google
                </a>

                <p className="text-center text-gray-600 text-sm">
                    Don't have an account?
                    <button type="button" onClick={() => setIsLogin(false)} className="text-indigo-600 hover:text-indigo-800 focus:outline-none ml-1">
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;