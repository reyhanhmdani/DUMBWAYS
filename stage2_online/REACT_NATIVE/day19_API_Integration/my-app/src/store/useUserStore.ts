import { create } from "zustand";

type UserStore = {
  name: string;
  setName: (name: string) => void;
  selectedProduct: any | null;
  setSelectedProduct: (product: any) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  name: "Raihan Hamdani",
  setName: (name) => set({ name }),
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  logout: () => set({ name: "Guest" }),
}));
