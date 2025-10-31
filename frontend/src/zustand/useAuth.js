import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useAuth = create((set) => ({
  user: null,
  loading: false,
  loggingIn: false,
  loggingOut: false,
  signingIn: false,
  uploading: false,

  checkAuthentication: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/auth/check");
      set({ user: res.data });
    } catch (e) {
    } finally {
      set({ loading: false });
    }
  },

  login: async (information) => {
    set({ loggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", information);
      set({ user: res.data });
    } catch (e) {
      toast.error(e.response?.data?.message);
    } finally {
      set({ loggingIn: false });
    }
  },

  signin: async (information) => {
    set({ signingIn: true });
    try {
      const res = await axiosInstance.post("/auth/signin", information);
      set({ user: res.data });
    } catch (e) {
      toast.error(e.response?.data?.message);
    } finally {
      set({ signingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ loggingOut: true });
      await axiosInstance.post("/auth/logout");
      set({ user: null });
    } catch (e) {
      toast.error(e.response?.data?.message);
    } finally {
      set({ loggingOut: false });
    }
  },

  updateProfile: async (data) => {
    set({ uploading: false });
    try {
      const res = await axiosInstance.put("/auth/update_profile", data);
      set({ user: res.data });
      toast.success("updated profile Successfully");
    } catch (e) {
      toast.error(e.response?.data?.message);
    } finally {
      set({ uploading: true });
    }
  },
}));
