import { create } from 'zustand'

export const useLoadingStore = create((set) => ({
  isLoading: true, //true for displaying of loading spinner when a page is visited
  setIsLoading: (newLoadingValue) => set({ isLoading: newLoadingValue }),
}))