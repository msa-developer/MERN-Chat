import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios.js";

const useAuth = create((set) => ({
  user: null,
  loading: false,

  checkUser: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/auth/check");
      set({ user: res.data });
    } catch (error) {
    } finally {
      set({ loading: false });
    }
  },

  login: async (information) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/login", information);
      set({ user: res.data });
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  signin: async (information) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/signup", information);
      set({ user: res.data });
      toast.success(res.data?.message || "User Signned In SuccessFully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuth;
