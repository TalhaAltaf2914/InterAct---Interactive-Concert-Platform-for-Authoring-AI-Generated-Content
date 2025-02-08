import { create } from 'zustand'

export const useKeywordsStore = create((set) => ({
    addedKeywords: [],
    setAddedKeywords: (newKeywords) => set({ addedKeywords: newKeywords }),
    resetKeywords: () => set({addedKeywords: []})
}))
