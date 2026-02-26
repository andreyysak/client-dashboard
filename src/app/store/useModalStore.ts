import { create } from 'zustand'

interface ModalData {
  isOpen: boolean
  props?: any
}

interface ModalState {
  modals: Record<string, ModalData>

  openModal: (id: string, props?: any) => void

  closeModal: (id: string) => void

  isModalOpen: (id: string) => boolean

  getModalProps: (id: string) => any
}

export const useModalStore = create<ModalState>((set, get) => ({
  modals: {},

  openModal: (id, props) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [id]: { isOpen: true, props },
      },
    })),

  closeModal: (id) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [id]: { isOpen: false, props: undefined },
      },
    })),

  isModalOpen: (id) => {
    return !!get().modals[id]?.isOpen
  },

  getModalProps: (id) => {
    return get().modals[id]?.props
  },
}))
