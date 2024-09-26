import { create } from 'zustand'

export const useAlertStore = create((set) => ({
    alertMsg: "",
    showAlert: false,
    severity:"error",
    
    setAlertMsg: (newAlertMsg) => set({ alertMsg: newAlertMsg }),
    setShowAlert: (newShowAlertValue) => set({ showAlert: newShowAlertValue }),
    setSeverity: (newSeverity) => set({ severity: newSeverity }),
}))