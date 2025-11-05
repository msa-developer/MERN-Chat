import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useChat = create((set, get) => ({
  tab: "chats",
  selectedUser: null,
  partners: [],
  contacts: [],
  messages: [],
  getting: false,
  messagesLoading: false,

  setTab: (tab) => set({ tab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  getContacts: async () => {
    set({ getting: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ contacts: res.data });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      set({ getting: false });
    }
  },

  getPartners: async () => {
    set({ getting: true });
    try {
      const res = await axiosInstance.get("/message/partners");
      set({ partners: res.data });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      set({ getting: false });
    }
  },

  getMessageById: async (id) => {
    set({ messagesLoading });
    try {
      const res = await axiosInstance.get(`/message/${id}`);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      set({ messagesLoading: false });
    }
  },

  sendMessage: async (data) => {
    try {
      await axiosInstance.post(`/message/send/${selectedUser?._id}`, data);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  },
}));
