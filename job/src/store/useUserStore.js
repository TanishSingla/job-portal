import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';


export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,
    success: false,
    isMobileVerified: false,
    isEmailVerified: false,

    register: async ({ name, mobile, companyName, companyEmail, employeeSize }) => {

        set({ loading: true });

        try {
            const resp = await axios.post("/auth/register", { name, mobile, companyName, companyEmail, employeeSize, });
            console.log(resp);
            set({ user: resp?.data?.user, loading: false, success: true });
            toast.success("Registeration Successful.Please verify your email and Mobile number.");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Error occured while creating new account.");
        }
    },
    verifyEmail: async ({ id, emailToken }) => {
        set({ loading: true });
        try {
            const resp = await axios.post(`/auth/verifyEmail`, { emailToken, id });

            set({ isEmailVerified: true, loading: false });
            toast.success("Email verified successfully.");

            return true;
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Error occured while verifying email account.");

            return false;
        }
    },
    verifyMobile: async ({ id, mobileToken }) => {
        set({ loading: true });
        console.log("dsfdasfa", id, mobileToken);
        try {
            const resp = await axios.post(`/auth/verifyMobile`, { id, mobileToken });

            set({ isMobileVerified: true, loading: false });
            toast.success("Mobile number verified successfully.");

            return true;
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Error occured while verifying mobile number.");

            return false;
        }
    },
    profile: async () => {
        set({ loading: true });
        try {
            const resp = await axios.get("/auth/profile");
            set({ user: resp?.data?.user, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
    logout: async () => {
        set({ loading: true });
        try {
            const resp = await axios.get("/auth/logout");
            set({ user: null, loading: false });
            toast.success('Logout successfuly');
        } catch (error) {
            toast.error('Error in logging out');
            set({ loading: false });
        }
    }

})
);  