import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const usePassagesStore = create(
    persist(
        (set) => ({
            passages: [{id: 0,}],
            setPassages: (newPassages) => set({ passages: newPassages }),
            
            addPassage: (newPassage) => set((state) => ({
                passages: [...state.passages, newPassage]
            })),
            
            deletePassage: (id) => set((state) => ({
                // state.setPassages(state.passages.filter(passage=> id !== passage.id))
                passages: state.passages.filter(passage=> id !== passage.id)
                // passages: [
                //     ...state.passages.slice(0, passageIndex),
                //     ...state.passages.slice(passageIndex + 1)
                // ]
            }))
        })
        ,
        {
            name: 'passages-storage', // name of the item in the storage (must be unique)
            // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    )
)
