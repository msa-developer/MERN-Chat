import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useAuth = create((set) => ({
  user: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ user: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("User Logged Out Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ user: res.data });
      toast.success("User logged In Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },

  signIn: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signIn", data);
      set({ user: res.data });
      toast.success("User Signed In Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },
}));

export default useAuth;
