import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useChat } from "./useChat";

const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuth = create((set, get) => ({
  authUser: null,
  loading: false,
  registering: false,
  loggingout: false,
  loggingin: false,
  onlineUsers: [],
  socket: null,

  connectSocket: () => {
    if (get().socket) return;
    const socket = io(baseUrl, {
      withCredentials: true,
      autoConnect: true,
    });

    set({ socket: socket });
    socket.connect();

    socket.on("onlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },

  disconnectSocket: () => {
    if (get().socket.connected) get().socket.disconnect();
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      if (res.data) get().connectSocket();
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
      if (res.data) get().connectSocket();
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
      if (get().socket.connected) get().disconnectSocket();
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
      if (res.data) get().connectSocket();
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
