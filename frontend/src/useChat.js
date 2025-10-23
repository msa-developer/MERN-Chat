import { create } from "zustand";

const useChat = create((set) => ({
  allContacts: [],
  chats: [],
}));

export default useChat;
