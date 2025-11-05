import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuth = create((set) => ({
  authUser: null,

  checkAuth: async () => {
    try {
      const res = axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  },
}));
