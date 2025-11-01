import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useChat = create((set, get) => ({
  contacts: [],
  partners: [],
  message: [],
  proceding: false,
  activeTab: "chats",
  selectedUser: null,
  messageLoading: false,

  setActive: (tab) => set({ activeTab: tab }),

  setSelectedUser: (user) => set({ selectedUser: user }),

  Contacts: async () => {
    set({ proceding: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ contacts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ proceding: false });
    }
  },

  Partners: async () => {
    set({ proceding: true });
    try {
      const res = await axiosInstance.get("/message/partners");
      set({ partners: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ proceding: false });
    }
  },

  messagesById: async (id) => {
    set({ messageLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${id}`);
      set({ message: res.data });
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      set({ messageLoading: true });
    }
  },

  sendMessage: async (id, data) => {
    try {
      await axiosInstance.post(`/message/send/${id}`, data);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  },
}));
