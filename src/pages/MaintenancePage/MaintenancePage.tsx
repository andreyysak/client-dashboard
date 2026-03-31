import { MaintenanceList } from '@/pages/MaintenancePage/ui/MaintenanceList.tsx'
import { FloatButton } from 'antd'
import { PlusIcon } from 'lucide-react'
import { useMaintenanceStore } from '@/entities/maintenance/model/store.ts'
import { MaintenanceForm } from '@/pages/MaintenancePage/ui/MaintenanceForm.tsx'

export const MaintenancePage = () => {
  const {setForm, form} = useMaintenanceStore()

  return (
    <div className='maintenance'>
      <MaintenanceList />

      <FloatButton shape='square' type='primary' icon={<PlusIcon />} onClick={() => setForm({isOpen: true, type: 'post'})} />

      {form.isOpen && (
        <MaintenanceForm />
      )}
    </div>
  )
}