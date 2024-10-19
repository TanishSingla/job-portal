import React, { useEffect } from 'react';
import SideBarComp from '../components/SideBarComp';
import { useUserStore } from '../store/useUserStore';
import { useJobStore } from '../store/useJobStore';

const JobPostedByMe = () => {
    // Mock job data

    const { jobPostsMe, jobPostedByMe } = useJobStore();


    useEffect(() => {
        jobPostedByMe();
        console.log(jobPostsMe)
    }, [jobPostedByMe])


    // JobCard component
    const JobCard = ({ job }) => {
        return (
            <div className="relative border border-gray-300 rounded-xl p-6 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
                <div>
                    <h2 className="text-xl font-semibold mb-2">{job.jobTitle}</h2>
                    <p className="text-gray-700 mb-3">{job.jobDescription}</p>
                    <p className="text-gray-500 mb-1">Company: <span className="font-medium">{job.company}</span></p>
                    <p className="text-gray-500">Job ID: <span className="font-medium">{job.jobId}</span></p>
                </div>
                <button className="mt-5 bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition-colors duration-300">
                    Delete
                </button>
                {/* End Date Display */}
                <div className="absolute top-6 right-6 text-sm text-gray-600">
                    <p>Expires on: <span className="font-medium">{job.endDate}</span></p>
                </div>
            </div>
        );
    };


    return (
        <div className="flex">
            <SideBarComp />
            <div className="ml-4 mt-16 p-6 w-full">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Jobs That You Have Posted</h1>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                    {jobPostsMe?.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobPostedByMe;
