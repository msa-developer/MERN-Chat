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

  ChangeTabs: (tab) => set({ activeTab: tab }),

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
}));
