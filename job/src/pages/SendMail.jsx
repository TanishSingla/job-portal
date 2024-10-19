import React, { useEffect, useState } from 'react';
import { FaRegCalendarAlt, FaHome, FaSpinner } from 'react-icons/fa';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';
import { useUserStore } from '../store/useUserStore';
import { useJobStore } from '../store/useJobStore';
import SideBarComp from '../components/SideBarComp';


const SendMail = () => {
    const { user, profile } = useUserStore();
    const { sendMail, loading } = useJobStore();

    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobType, setJobType] = useState(null); // Job type state
    const [candidates, setCandidates] = useState([]);
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!jobTitle) newErrors.jobTitle = 'Job title is required';
        if (!jobDescription) newErrors.jobDescription = 'Job description is required';
        if (!jobType) newErrors.jobType = 'Job type is required'; // Validation for job type
        if (candidates.length === 0) newErrors.candidates = 'At least one candidate is required';
        if (!endDate) newErrors.endDate = 'End date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please login first');
            return;
        }

        if (!validate()) return;


        const data = {
            jobTitle,
            jobDescription,
            jobType: jobType?.value || 'Full-time',
            candidates: candidates.map(candidate => candidate.value),
            endDate,
        };

        try {
            await sendMail(data);

            setJobTitle('');
            setJobDescription('');
            setJobType(null);
            setCandidates([]);
            setEndDate('');
            toast.success('Email sent successfully!');
        } catch (error) {
            toast.error('Failed to send email, please try again.');
        }
    };


    return (
        <div className="flex">
            <SideBarComp />
            <div className="flex-grow p-4 bg-gray-100">
                <div className='flex justify-center mb-4 text-2xl font-bold'>
                    <h1>Send Mail</h1>
                </div>
                <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
                    <form onSubmit={onSubmit}>
                        {/* Job Title */}
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Job Title</label>
                            <input
                                type="text"
                                placeholder="Enter Job Title"
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.jobTitle ? 'border-red-500' : 'focus:border-blue-500'}`}
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                            {errors.jobTitle && <span className="text-red-500">{errors.jobTitle}</span>}
                        </div>

                        {/* Job Description */}
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Job Description</label>
                            <textarea
                                placeholder="Enter Job Description"
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.jobDescription ? 'border-red-500' : 'focus:border-blue-500'}`}
                                rows="4"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            ></textarea>
                            {errors.jobDescription && <span className="text-red-500">{errors.jobDescription}</span>}
                        </div>

                        {/* Job Type */}
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Job Type</label>
                            <Select
                                options={[
                                    { value: 'Full-time', label: 'Full-time' },
                                    { value: 'Part-time', label: 'Part-time' },
                                    { value: 'Contract', label: 'Contract' },
                                ]}
                                placeholder="Select Job Type"
                                className={`w-full ${errors.jobType ? 'border-red-500' : ''}`}
                                onChange={(selectedOption) => setJobType(selectedOption)}
                                value={jobType}
                            />
                            {errors.jobType && <span className="text-red-500">{errors.jobType}</span>}
                        </div>

                        {/* Add Candidate */}
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Add Candidate</label>
                            <CreatableSelect
                                isMulti
                                placeholder="xyz@gmail.com"
                                className={`w-full ${errors.candidates ? 'border-red-500' : ''}`}
                                onChange={(selectedOptions) => setCandidates(selectedOptions)}
                                value={candidates}
                            />
                            {errors.candidates && <span className="text-red-500">{errors.candidates}</span>}
                        </div>

                        {/* End Date */}
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">End Date</label>
                            <div className="flex items-center border rounded-md px-3 py-2">
                                <FaRegCalendarAlt className="text-gray-500 mr-2" />
                                <input
                                    type="date"
                                    className={`w-full focus:outline-none ${errors.endDate ? 'border-red-500' : ''}`}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            {errors.endDate && <span className="text-red-500">{errors.endDate}</span>}
                        </div>

                        {/* Send Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className={`bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-2" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SendMail;


