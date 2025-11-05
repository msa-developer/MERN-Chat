import { create } from "zustand";

export const useSlide = create((set) => ({
  show: true,
  setShow: () => set((state) => ({ show: !state.show })),
}));
