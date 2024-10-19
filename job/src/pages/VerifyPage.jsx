import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { useLocation } from 'react-router-dom';

const VerifyPage = () => {
    const location = useLocation();
    const { id } = location.state || {};

    const { isEmailVerified, isMobileVerified, verifyMobile, verifyEmail, loading } = useUserStore();
    const [emailOtp, setEmailOtp] = useState("");
    const [mobileOtp, setMobileOtp] = useState("");
    const [isEmailVerifiedState, setIsEmailVerifiedState] = useState(false);
    const [isMobileVerifiedState, setIsMobileVerifiedState] = useState(false);

    if (isEmailVerified && isMobileVerified) {
        return <Navigate to="/home" />;
    }

    const handleMobileOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyMobile({ id, mobileToken: mobileOtp });
            setIsMobileVerifiedState(true);
        } catch (error) {
            console.error("Error verifying mobile:", error);
        }
    };

    const handleEmailOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyEmail({ id, emailToken: emailOtp });
            setIsEmailVerifiedState(true);
        } catch (error) {
            console.error("Error verifying email:", error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-auto items-center justify-center mt-16">
            {/* Left Side - Text */}
            <div className="md:w-1/2 w-full p-6 md:p-8">
                <p className="text-lg text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley.
                </p>
            </div>

            {/* Right Side - Signup Form */}
            <div className="md:w-1/2 w-full p-6 bg-gray-50">
                <div className="max-w-md mx-auto bg-white shadow-lg p-4 rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
                    <p className="text-center text-gray-500 mb-4">
                        Lorem Ipsum is simply dummy text
                    </p>
                    <form>
                        <div className="mb-3">
                            <label className="block text-gray-700">Email Otp</label>
                            <div className="flex items-center border border-transparent focus-within:border-black rounded-lg px-3 py-2 bg-gray-100">
                                <FaEnvelope className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    className={`w-full bg-transparent outline-none text-gray-700 ${isEmailVerifiedState ? 'opacity-50' : ''}`}
                                    placeholder="Email OTP"
                                    onChange={e => setEmailOtp(e.target.value)}
                                    value={emailOtp}
                                    disabled={isEmailVerifiedState}
                                />
                                {isEmailVerifiedState && <FaCheckCircle className="text-green-500 ml-2" />}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200 mt-4 flex items-center justify-center"
                                onClick={handleEmailOtpSubmit}
                                disabled={isEmailVerifiedState || loading}
                            >
                                {loading ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-2" />
                                        Verifying...
                                    </>
                                ) : (
                                    'Verify'
                                )}
                            </button>
                        </div>

                        {/* Phone No Field */}
                        <div className="mb-3">
                            <label className="block text-gray-700">Phone No.</label>
                            <div className="flex items-center border border-transparent focus-within:border-black rounded-lg px-3 py-2 bg-gray-100">
                                <FaPhoneAlt className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    className={`w-full bg-transparent outline-none text-gray-700 ${isMobileVerifiedState ? 'opacity-50' : ''}`}
                                    placeholder="Mobile OTP"
                                    value={mobileOtp}
                                    onChange={e => setMobileOtp(e.target.value)}
                                    disabled={isMobileVerifiedState}
                                />
                                {isMobileVerifiedState && <FaCheckCircle className="text-green-500 ml-2" />}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200 mt-4 flex items-center justify-center"
                                onClick={handleMobileOtpSubmit}
                                disabled={isMobileVerifiedState || loading}
                            >
                                {loading ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-2" />
                                        Verifying...
                                    </>
                                ) : (
                                    'Verify'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyPage;
