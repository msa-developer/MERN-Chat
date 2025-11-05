import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuth = create((set) => ({
  authUser: null,
  loading: false,
  registering: false,
  loggingout: false,
  loggingin: false,

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (err) {
    } finally {
      set({ loading: false });
    }
  },

  RegisterUser: async (info) => {
    set({ registering: true });
    try {
      const res = await axiosInstance.post("/auth/register", info);
      set({ authUser: res.data });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      set({ registering: false });
    }
  },

  LogoutUser: async () => {
    set({ loggingout: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      set({ loggingout: false });
    }
  },

  LoginUser: async (info) => {
    set({ loggingin: true });
    try {
      const res = await axiosInstance.post("/auth/login", info);
      set({ authUser: res.data });
      toast.success("Logged In out successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      set({ loggingin: false });
    }
  },
  updateProfile: async (img) => {
    try {
      const res = await axiosInstance.put("/auth/update", { profilePic: img });
      toast.success(res.data?.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  },
}));
