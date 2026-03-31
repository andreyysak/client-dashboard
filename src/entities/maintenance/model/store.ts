import { create } from 'zustand'
import { Maintenance } from '@/entities/maintenance/model/Maintenance.ts'

interface MaintenanceState {
  form: {
    isOpen: boolean
    type?: 'post' | 'patch'
  }

  currentMaintenance: Maintenance | null

  setForm: (form: { isOpen: boolean; type?: 'post' | 'patch' }) => void

  setCurrentMaintenance: (maintenance: Maintenance | null) => void
}

export const useMaintenanceStore = create<MaintenanceState>((set) => ({
  form: {
    isOpen: false,
    type: 'post',
  },

  currentMaintenance: null,

  setForm: (form) => set({ form }),

  setCurrentMaintenance: (maintenance) => set({ currentMaintenance: maintenance }),
}))
