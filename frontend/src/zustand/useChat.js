import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { useAuth } from "./useAuth.js";

export const useChat = create((set, get) => ({
  tab: "chats",
  selectedUser: null,
  partners: [],
  contacts: [],
  messages: [],

  setTab: (tab) => set({ tab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  getContacts: async () => {
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ contacts: res.data });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  },

  getPartners: async () => {
    try {
      const res = await axiosInstance.get("/message/partners");
      set({ partners: res.data });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  },

  getMessageById: async () => {
    try {
      const res = await axiosInstance.get(`/message/${get().selectedUser._id}`);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  },

  sendMessage: async (data) => {
    try {
      const res = await axiosInstance.post(
        `/message/send/${get().selectedUser?._id}`,
        data,
      );
      set({ messages: [...get().messages, res.data] });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  },
  RealTimeMsg: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuth.getState().socket;
    socket.on("newMessage", (msg) => {
      set({ messages: [...get().messages, msg] });
    });
  },
  StopRealTimeMsg: () => {
    const socket = useAuth.getState().socket;
    socket.off("newMessage");
  },
}));
