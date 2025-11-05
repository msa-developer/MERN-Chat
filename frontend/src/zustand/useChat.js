import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

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
      set((state) => ({ messages: state.messages.concat(res.data) }));
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  },
}));
