import React, { useState } from 'react';
import { FaRegCalendarAlt, FaSpinner } from 'react-icons/fa';
import Select from 'react-select';
import { useJobStore } from '../store/useJobStore';
import SideBarComp from '../components/SideBarComp';

const CreateJobPostPage = () => {
    const { createPost, loading } = useJobStore();

    const [jobId, setJobId] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobType, setJobType] = useState(null);
    const [company, setCompany] = useState(''); // State for company input
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!jobId) newErrors.jobId = 'Job ID is required';
        if (!jobTitle) newErrors.jobTitle = 'Job title is required';
        if (!jobDescription) newErrors.jobDescription = 'Job description is required';
        if (!jobType) newErrors.jobType = 'Job type is required';
        if (!company) newErrors.company = 'Company name is required'; // Validate company
        if (!endDate) newErrors.endDate = 'End date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const data = {
            jobId,
            jobTitle,
            jobDescription,
            jobType: jobType?.value || 'Full-time',
            company, // Include company in data
            endDate,
        };

        try {
            await createPost(data);

            // Reset fields after successful submission
            setJobId('');
            setJobTitle('');
            setJobDescription('');
            setJobType(null);
            setCompany(''); // Reset company field
            setEndDate('');
            // toast.success('Job created successfully!');
        } catch (error) {
            // toast.error('Failed to create job, please try again.');
            console.log(error);
        }
    };

    return (
        <div className="flex">
            <SideBarComp />
            <div className="flex-grow p-6">
                <div className='flex justify-center mb-4 text-2xl font-bold'>
                    <h1>Create Job Post</h1>
                </div>
                <div className="flex justify-center mt-10">
                    <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
                        <form onSubmit={onSubmit}>
                            {/* Job ID */}
                            <div className="mb-4">
                                <label className="block text-gray-600 mb-2">Job ID</label>
                                <input
                                    type="text"
                                    placeholder="Enter Job ID"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.jobId ? 'border-red-500' : 'focus:border-blue-500'}`}
                                    value={jobId}
                                    onChange={(e) => setJobId(e.target.value)}
                                />
                                {errors.jobId && <span className="text-red-500">{errors.jobId}</span>}
                            </div>

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

                            {/* Company */}
                            <div className="mb-4">
                                <label className="block text-gray-600 mb-2">Company</label>
                                <input
                                    type="text"
                                    placeholder="Enter Company Name"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.company ? 'border-red-500' : 'focus:border-blue-500'}`}
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                                {errors.company && <span className="text-red-500">{errors.company}</span>}
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

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className={`bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <FaSpinner className="animate-spin mr-2" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Job'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateJobPostPage;
