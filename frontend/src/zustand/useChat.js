import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useChat = create((set, get) => ({
  message: [],
  partners: [],
  contacts: [],
  tab: null,

  changeTab: (tab) => {
    set({ tab: tab });
  },

  getMessages: async (id) => {
    try {
      const res = await axiosInstance.get(`/message/${id}`);
      set({ message: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },

  getContacts: async () => {
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ contacts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },

  getPartners: async () => {
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ partners: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },
}));

export default useChat;
