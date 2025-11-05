import React from "react";
import { create } from "zustand";

export const useSlide = create((set) => ({
  show: true,

  setShowFalse: () => set({ show: false }),
  setShowTrue: () => set({ show: true }),
}));
