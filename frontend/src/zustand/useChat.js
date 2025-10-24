import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useChat = create((set) => ({
  contacts: [],
  messages: [],
  partners: [],
  currentTab: "chats",
  selectedUser: null,
  loading: false,

  changeTab: (tab) => set({ currentTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),

  getAllContacts: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ contacts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  Partners: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/message/partners");
      set({ partners: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useChat;
