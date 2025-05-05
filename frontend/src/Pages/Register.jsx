import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const REGISTER_OTP_ENDPOINT = 'http://localhost:5000/api/auth/register/otp';
const VERIFY_OTP_ENDPOINT = 'http://localhost:5000/api/auth/register/verify';

const Register = ({ onRequestClose, setIsLogin }) => {
    const [step, setStep] = useState(1); // 1: Mobile/Host, 2: OTP, 3: Details/Password
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [sendOtpError, setSendOtpError] = useState('');
    const [verificationError, setVerificationError] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const navigate = useNavigate();

    const handleMobileChange = (e) => setMobile(e.target.value);
    const handleOTPChange = (e) => setOtp(e.target.value);
    const handleHostToggle = (e) => setIsHost(e.target.checked);
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const handleTermsChange = (e) => setTermsAgreed(e.target.checked);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setSendOtpError('');
        try {
            const response = await fetch(REGISTER_OTP_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile }),
            });
            const data = await response.json();
            if (response.ok) {
                setStep(2);
            } else {
                setSendOtpError(data.message || 'Failed to send OTP.');
            }
        } catch (error) {
            setSendOtpError('Network error during OTP send.');
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setVerificationError('');
        try {
            const response = await fetch(VERIFY_OTP_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, otp, userType: isHost ? 'host' : 'user' }),
            });
            const data = await response.json();
            if (response.ok) {
                setStep(3);
            } else {
                setVerificationError(data.message || 'Invalid OTP.');
            }
        } catch (error) {
            setVerificationError('Network error during OTP verification.');
        }
    };

    const handleFinalRegistration = async (e) => {
        e.preventDefault();
        setRegistrationError('');

        if (password !== confirmPassword) {
            setRegistrationError("Passwords do not match.");
            return;
        }

        if (!termsAgreed) {
            setRegistrationError("Please agree to the terms and conditions.");
            return;
        }

        try {
            const response = await fetch(VERIFY_OTP_ENDPOINT, { // Assuming your backend handles final registration here
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, otp, name, email, password, userType: isHost ? 'host' : 'user' }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Registration successful', data);
                onAuthSubmit(data.token, data.user.mobile || data.user.email, data.user.isHost, data.user.role);
                onRequestClose();
            } else {
                setRegistrationError(data.message || 'Registration failed.');
            }
        } catch (error) {
            setRegistrationError('Network error during registration.');
        }
    };

    return (
        <div className="bg-gray-100 p-8 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h2>

            {step === 1 && (
                <form onSubmit={handleSendOTP} className="space-y-4">
                    <div>
                        <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                        <input type="tel" id="mobile" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your mobile number" value={mobile} onChange={handleMobileChange} required />
                        {sendOtpError && <p className="text-red-500 text-xs italic mt-1">{sendOtpError}</p>}
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="isHost" className="form-checkbox h-5 w-5 text-indigo-600" onChange={handleHostToggle} checked={isHost} />
                        <label htmlFor="isHost" className="ml-2 text-gray-700 text-sm">Sign Up as Host</label>
                    </div>
                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Continue</button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div>
                        <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
                        <input type="text" id="otp" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter the OTP sent to your mobile" value={otp} onChange={handleOTPChange} required />
                        {verificationError && <p className="text-red-500 text-xs italic mt-1">{verificationError}</p>}
                    </div>
                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Verify OTP</button>
                    <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none">Back to Mobile</button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleFinalRegistration} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={handleNameChange} required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={handleEmailChange} required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password} onChange={handlePasswordChange} required />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="cursor-pointer text-gray-500" onClick={togglePasswordVisibility} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <div className="relative">
                            <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="cursor-pointer text-gray-500" onClick={toggleConfirmPasswordVisibility} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="terms" className="form-checkbox h-5 w-5 text-indigo-600" onChange={handleTermsChange} checked={termsAgreed} required />
                        <label htmlFor="terms" className="ml-2 text-gray-700 text-sm">I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">terms and conditions</a></label>
                    </div>
                    {registrationError && <p className="text-red-500 text-xs italic mt-1">{registrationError}</p>}
                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Complete Sign Up</button>
                    <button type="button" onClick={() => setStep(2)} className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none mt-2">Back to OTP</button>
                </form>
            )}

            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-gray-100 px-2 text-gray-500">or</span>
                </div>
            </div>

            <a href="http://localhost:5000/api/auth/google" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center">
                {/* Google Icon (You might need to install a library like heroicons or font-awesome) */}
                <svg className="mr-2 -ml-1 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.19-2.25H12V16.36h6.65c-.3 1.83-1.88 3.1-3.84 3.1-2.8 0-5.12-2.27-5.12-5.07S9.12 7.29 11.92 7.29c1.13 0 2.12.4 2.88 1.16l1.98-1.98c-1.2-1.1-2.72-1.76-4.56-1.76C6.62 4.51 3 7.86 3 12.25c0 4.39 3.62 7.74 8.92 7.74 2.29 0 4.25-.76 5.71-2.03l-1.98 1.98c-1.1 1.05-2.55 1.69-4.03 1.69-3.34 0-6.15-2.75-6.15-6.15s2.81-6.15 6.15-6.15c1.76 0 3.29.66 4.5 1.78l2.08-2.08c-1.12-1.09-2.53-1.75-4.01-1.75C6.35 5.26 3 8.59 3 12.25z"/>
                </svg>
                Continue with Google
            </a>

            <p className="text-center text-gray-600 text-sm">
                Already have an account?
                <button type="button" onClick={() => setIsLogin(true)} className="text-indigo-600 hover:text-indigo-800 focus:outline-none ml-1">Log In</button>
            </p>
        </div>
    );
};

export default Register;