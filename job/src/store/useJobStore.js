import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useJobStore = create((set) => ({
    user: null,
    loading: false,
    success: false,
    jobPosts: [],
    jobPostsMe: [],


    sendMail: async ({ jobTitle, jobDescription, jobType, endDate, candidates }) => {
        set({ loading: true });
        try {
            const resp = await axios.post("/jobs/sendMail", {
                jobTitle,
                jobDescription,
                jobType,
                endDate,
                candidates,
            });
            set({ loading: false, success: true });
            toast.success("Email sent successfully.");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Error occurred while sending mail.");
        }
    },
    createPost: async ({ jobId, jobTitle, jobDescription, jobType, endDate, company }) => {
        set({ loading: true });

        try {
            const resp = await axios.post("/jobs/jobPost", {
                jobId,
                jobTitle,
                jobDescription,
                jobType,
                endDate,
                company
            });
            set({ loading: false, success: true });
            toast.success("Job created successfully.");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Error occurred while creating job.");
        }
    },
    jobPostedByMe: async () => {
        set({ loading: true });
        try {
            const resp = await axios.get("/jobs/users/me");
            set({ jobPostsMe: resp?.data?.jobs, loading: false });

        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Error occurred while fetching jobs posted by me.");
        }
    },
    allJobs: async () => {
        set({ loading: true });
        try {
            const resp = await axios.get("/jobs");
            set({ jobPosts: resp?.data?.jobPosts, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    }
}));
