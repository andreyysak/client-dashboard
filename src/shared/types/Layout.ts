export type Layout = 'classic' | 'sidebar'

export interface LayoutContextProps {
  layout: Layout
  setLayout: (layout: Layout) => void
  isSidebarOpen: boolean
  toggleSidebar: () => void
}
