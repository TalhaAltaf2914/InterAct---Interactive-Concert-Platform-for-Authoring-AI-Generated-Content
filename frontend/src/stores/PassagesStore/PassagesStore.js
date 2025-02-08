import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { get, set, del } from "idb-keyval"; // IndexedDB helper

const indexedDBStorage = {
    setItem: (key, value) => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("zustand-db", 1);
  
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains("store")) {
            db.createObjectStore("store");
          }
        };
  
        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction("store", "readwrite");
          const store = transaction.objectStore("store");
          const putRequest = store.put(value, key);
  
          putRequest.onsuccess = () => resolve();
          putRequest.onerror = () => reject(putRequest.error);
        };
  
        request.onerror = () => reject(request.error);
      });
    },
  
    getItem: (key) => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("zustand-db", 1);
  
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains("store")) {
            db.createObjectStore("store");
          }
        };
  
        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction("store", "readonly");
          const store = transaction.objectStore("store");
          const getRequest = store.get(key);
  
          getRequest.onsuccess = () => resolve(getRequest.result || null);
          getRequest.onerror = () => reject(getRequest.error);
        };
  
        request.onerror = () => reject(request.error);
      });
    },
  
    removeItem: (key) => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("zustand-db", 1);
  
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains("store")) {
            db.createObjectStore("store");
          }
        };
  
        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction("store", "readwrite");
          const store = transaction.objectStore("store");
          const deleteRequest = store.delete(key);
  
          deleteRequest.onsuccess = () => resolve();
          deleteRequest.onerror = () => reject(deleteRequest.error);
        };
  
        request.onerror = () => reject(request.error);
      });
    },
  };

// Define custom storage for Zustand's persist middleware using IndexedDB
// const indexedDBStorage = {
//     setItem: async (key, value) => {
//         try {
//             await set(key, value); // Persist data using idb-keyval's async set
//         } catch (error) {
//             console.error('Error setting item in IndexedDB:', error);
//         }
//     },

//     getItem: async (key) => {
//         try {
//             return await get(key); // Retrieve data using idb-keyval's async get
//         } catch (error) {
//             console.error('Error getting item from IndexedDB:', error);
//             return null;
//         }
//     },

//     removeItem: async (key) => {
//         try {
//             await del(key); // Delete item using idb-keyval's async del
//         } catch (error) {
//             console.error('Error removing item from IndexedDB:', error);
//         }
//     },
// };
  
  
  

export const usePassagesStore = create(
    persist(
        (set, get) => ({
            passages: [{id: 0}],
            passageTexts: [{id: 0, texts: []}],
            passageImages: [{id: 0, images: []}],
            displayPassagesImage:[{id:0, displayImage: ""}],
            activePassageIndexes: [{id: 0, index:0}],
            activeImageIndexes: [{id: 0, index:0}],

            resetPassages: () => {
                // const state = get(); // Get current state
    
                set({
                    passages: [{id: 0}],
                    passageTexts: [{id: 0, texts: []}],
                    passageImages: [{id: 0, images: []}],
                    displayPassagesImage:[{id:0, displayImage: ""}],
                    activePassageIndexes: [{id: 0, index:0}],
                    activeImageIndexes: [{id: 0, index:0}],
                });
            },

            setPassages: (newPassages) => set({ passages: newPassages }),
            
            setActivePassageIndex: (id, index) => set((state) => ({
                activePassageIndexes: state.activePassageIndexes.map(activePassageIndex =>{
                    if(activePassageIndex.id === id){
                        // alert(`Updated passage index: ${index}`)
                        return {
                            ...activePassageIndex,
                            index: index,
                        }
                    }
                    return activePassageIndex;
                })
            })),     
            
            setActiveImageIndex: (id, index) => set((state) => ({
                activeImageIndexes: state.activeImageIndexes.map(activeImageIndex =>{
                    if(activeImageIndex.id === id){
                        // alert(`Updated passage index: ${index}`)
                        return {
                            ...activeImageIndex,
                            index: index,
                        }
                    }
                    return activeImageIndex;
                })
            })), 

            // addPassage: (newPassage) => set((state) => ({
            //     passages: [...state.passages, newPassage],
            // })),

            addPassage: (newPassage) => {
                const state = get(); // Get current state
    
                set({
                    passages: [...state.passages, newPassage],
                    passageTexts: [...state.passageTexts, {id: newPassage.id, texts:[]}],
                    passageImages: [...state.passageImages, {id: newPassage.id, images:[]}],
                    
                    activePassageIndexes: [...state.activePassageIndexes, {id: newPassage.id, index:0}],
                    activeImageIndexes: [...state.activeImageIndexes, {id: newPassage.id, index:0}],
                });
            },
            
            // addPassageText: (id, newPassageText) => set((state) => ({
            //     passageTexts: state.passageTexts.map((passageText) => {
            //         if (id === passageText.id) {
            //             // return {
            //             //     ...passageText,
            //             //     texts: [...passageText.texts, newPassageText], // Correct way to update texts
            //             // };

            //             passageText.texts.push(newPassageText)
            //         }
            //         return passageText;
            //     })
            // })),

            addPassageText: (id, newPassageText) => set((state) => ({
                passageTexts: state.passageTexts.map((passageText) =>
                    passageText.id === id
                        ? { ...passageText, texts: [...passageText.texts, newPassageText] }
                        : passageText
                ),
            })),

            addPassageImages: (id, newPassageImages) => set((state) => ({
                passageImages: state.passageImages.map((passageImage) => {
                    console.log('addPassageImages()')
                    if (id === passageImage.id) {
                        console.log(`found passage`)
                        console.log(`returning: ${
                            {
                                ...passageImage,
                                images: newPassageImages, // Correct way to update texts
                            }
                        }`)
                        return {
                            ...passageImage,
                            id: passageImage.id,
                            images: newPassageImages, // Correct way to update texts
                        };
                    }
                    return passageImage;
                }),

            })),

            addDisplayPassageImage: (id, newDisplayPassage) => set((state) => ({
                displayPassagesImage: state.displayPassagesImage.map(displayPassage =>{
                    if (displayPassage.id !== id){
                        
                        return {
                            ...displayPassage,
                            newDisplayPassage,
                        }
                    }

                    return displayPassage;
                })
                // [...state.displayPassagesImage, newDisplayPassage],
            })),

            setDisplayPassageImage: (id, displayPassageImage) => set((state) => ({
                displayPassagesImage: state.displayPassagesImage.map((displayPassage) => {
                    if (id === displayPassage.id) {
                        return {
                            ...displayPassage,
                            id: displayPassage.id,
                            image:  displayPassageImage, // Correct way to update images
                        };
                    }
                    return displayPassage;
                })
            })),


            deletePassage: (id) => set((state) => ({
                // state.setPassages(state.passages.filter(passage=> id !== passage.id))
                passages: state.passages.filter(passage=> id !== passage.id),
                passageTexts: state.passageTexts.filter(passageText=> id !== passageText.id),
                passageImages: state.passageImages.filter(passageImage=> id !== passageImage.id),
                
                activePassageIndexes: state.activePassageIndexes.filter(activePassageIndex=> id !== activePassageIndex.id),
                activeImageIndexes: state.activeImageIndexes.filter(activeImageIndex=> id !== activeImageIndex.id),
                
                // passages: [
                //     ...state.passages.slice(0, passageIndex),
                //     ...state.passages.slice(passageIndex + 1)
                // ]
            })),
            
            getPassageTexts: (id) => {
                const passageTexts = get().passageTexts || []; // Ensure it's always an array
                console.log("passageTexts in component:", passageTexts);
                const passageText = passageTexts.find(passageText => passageText.id === id);
                
                console.log("passageTexts:", passageTexts); // Debugging
                console.log("Found passageText:", passageText); // Debugging
                
                return passageText ? passageText.texts : []; // Safe return
            },

            getPassageImages: (id) => {
                console.log(`getPassageImages`)
                console.log(`passde id: ${id}`)
                const passageImages = get().passageImages || []; // Ensure it's always an array
                console.log("passageImages in component:", passageImages);
                const passageImage = passageImages.find(passageImage => passageImage.id === id);
                
                console.log("passageImages:", passageImages); // Debugging
                console.log("Found passageImage:", passageImage.images); // Debugging
                
                // return passageImage.images;
                return passageImage.images ? passageImage.images : []; // Safe return
            },
            
            getActivePassageIndex: (id) => {
                console.log(`getActivePassageIndex`)
                console.log(`passde id: ${id}`)
                const activePassageIndexes = get().activePassageIndexes || []; // Ensure it's always an array
                console.log("activePassageIndexes in component:", activePassageIndexes);
                const activePassageIndex = activePassageIndexes.find(activePassageIndex => activePassageIndex.id === id);
                
                console.log("activePassageIndexes:", activePassageIndexes); // Debugging
                console.log("Found activePassageIndex:", activePassageIndex.index); // Debugging
                
                // return activePassageIndex.images;
                return activePassageIndex.index ? activePassageIndex.index : 0; // Safe return
            },

            getActiveImageIndex: (id) => {
                console.log(`getActiveImageIndex`)
                console.log(`passde id: ${id}`)
                const activeImageIndexes = get().activeImageIndexes || []; // Ensure it's always an array
                console.log("activeImageIndexes in component:", activeImageIndexes);
                const activeImageIndex = activeImageIndexes.find(activeImageIndex => activeImageIndex.id === id);
                
                console.log("activeImageIndexes:", activeImageIndexes); // Debugging
                console.log("Found activeImageIndex:", activeImageIndex.index); // Debugging
                
                // return activeImageIndex.images;
                return activeImageIndex.index ? activeImageIndex.index : 0; // Safe return
            }
            
            // getPassageTexts: (id) => get().passageTexts.filter(passageText => passageText.id === id).texts
            // getById: (id) => get().items.find((item) => item.id === id)
        })
        ,
        {
            name: 'passages-storage', // name of the item in the storage (must be unique)
            // partialize: (state) => {
            //     const { passageImages, ...rest } = state; // Exclude passageImages from persistence
            //     return rest;
            // },
            // storage: createJSONStorage(() => localStorage),
            getStorage: () => indexedDBStorage, // Use custom IndexedDB storage for persistence
            storage: createJSONStorage(() => indexedDBStorage), // Use IndexedDB instead
            onRehydrateStorage: () => {
                console.log('Rehydrating state from IndexedDB...'); // Log when rehydrating state
            }
        },
    )
)

// // Force rehydration after the store initializes
usePassagesStore.persist.rehydrate();
