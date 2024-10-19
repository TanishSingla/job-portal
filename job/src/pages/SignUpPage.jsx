import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUserAlt, FaPhoneAlt, FaBuilding, FaEnvelope, FaUsers, FaSpinner } from 'react-icons/fa';
import { useUserStore } from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const phoneRegex = /^\+\d{1,3}\d{7,14}$/;

const SignUpPage = () => {
    const navigate = useNavigate();
    const { register, loading, success } = useUserStore();
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm(); // Include errors from formState

    const onSubmitHandler = async (data) => {
        try {
            await register(data);

            const user = useUserStore.getState().user;
            console.log("ussssser", user);
            if (user) {
                navigate('/verify', { state: { id: user.id } });
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-auto items-center justify-center z-1">
            {/* Left Side - Text */}
            <div className="md:w-1/2 w-full p-6 md:p-8">
                <p className="text-lg text-gray-600">
                    Welcome to my website! Here, you can effortlessly post job opportunities and manage them with ease. You can also send emails to multiple users at once, streamlining your communication process for efficient job management.
                </p>
            </div>

            {/* Right Side - Signup Form */}
            <div className="md:w-1/2 w-full p-6 bg-gray-50">
                <div className="max-w-md mx-auto bg-white shadow-lg p-4 rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
                    <p className="text-center text-gray-500 mb-4">
                        Sign up here and post jobs easily!
                    </p>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        {/* Name Field */}
                        <div className="mb-3">
                            <label className="block text-gray-700">Name</label>
                            <div className="flex items-center border border-transparent focus-within:border-black transition duration-200 rounded-lg px-3 py-2 bg-gray-100">
                                <FaUserAlt className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    {...formRegister('name', { required: 'Name is required' })}
                                    className="w-full bg-transparent outline-none text-gray-700"
                                    placeholder="Name"
                                />
                            </div>
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>} {/* Error message */}
                        </div>

                        {/* Phone No Field */}
                        <div className="mb-3">
                            <label className="block text-gray-700">Phone No.</label>
                            <div className="flex items-center border border-transparent focus-within:border-black transition duration-200 rounded-lg px-3 py-2 bg-gray-100">
                                <FaPhoneAlt className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    {...formRegister('mobile', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: phoneRegex,
                                            message: 'Phone number must start with + followed by the country code and then the number',
                                        },
                                    })}
                                    className="w-full bg-transparent outline-none text-gray-700"
                                    placeholder="Phone no."
                                />
                            </div>
                            {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>} {/* Error message */}
                        </div>

                        {/* Company Name Field */}
                        <div className="mb-3">
                            <label className="block text-gray-700">Company Name</label>
                            <div className="flex items-center border border-transparent focus-within:border-black transition duration-200 rounded-lg px-3 py-2 bg-gray-100">
                                <FaBuilding className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    {...formRegister('companyName', { required: 'Company Name is required' })}
                                    className="w-full bg-transparent outline-none text-gray-700"
                                    placeholder="Company Name"
                                />
                            </div>
                            {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>} {/* Error message */}
                        </div>

                        {/* Company Email Field */}
                        <div className="mb-3">
                            <label className="block text-gray-700">Company Email</label>
                            <div className="flex items-center border border-transparent focus-within:border-black transition duration-200 rounded-lg px-3 py-2 bg-gray-100">
                                <FaEnvelope className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    {...formRegister('companyEmail', { required: 'Company Email is required' })}
                                    className="w-full bg-transparent outline-none text-gray-700"
                                    placeholder="Company Email"
                                />
                            </div>
                            {errors.companyEmail && <p className="text-red-500">{errors.companyEmail.message}</p>} {/* Error message */}
                        </div>

                        {/* Employee Size Field */}
                        <div className="mb-3">
                            <label className="block text-gray-700">Employee Size</label>
                            <div className="flex items-center border border-transparent focus-within:border-black transition duration-200 rounded-lg px-3 py-2 bg-gray-100">
                                <FaUsers className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    {...formRegister('employeeSize', { required: 'Employee Size is required' })}
                                    className="w-full bg-transparent outline-none text-gray-700"
                                    placeholder="Employee Size"
                                />
                            </div>
                            {errors.employeeSize && <p className="text-red-500">{errors.employeeSize.message}</p>} {/* Error message */}
                        </div>

                        {/* Terms & Conditions */}
                        <p className="text-center text-gray-500 mb-3">
                            By clicking on proceed you will accept our<br />
                            <span className="text-blue-600 underline cursor-pointer">
                                Terms & Conditions
                            </span>
                        </p>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200 flex items-center justify-center"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    Registering...
                                </>
                            ) : (
                                'Proceed'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
