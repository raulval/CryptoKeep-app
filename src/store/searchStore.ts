import { create } from "zustand";

export interface SearchData {
  search: string;
}

export interface SearchAction {
  setSearch: (search: string) => void;
}

export const useSearchStore = create<SearchData & SearchAction>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
