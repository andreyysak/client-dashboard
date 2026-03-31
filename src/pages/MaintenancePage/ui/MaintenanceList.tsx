import { useMaintenance } from '@/entities/maintenance/api/query.ts'
import Loader from '@/widgets/Loader'
import { MaintenanceListItem } from '@/pages/MaintenancePage/ui/MaintenanceListItem.tsx'

export const MaintenanceList = () => {
  const {maintenances, isLoading} = useMaintenance()

  if (isLoading) {
    return <Loader />
  }

  return <div className="maintenance__list">
    {maintenances.map((item) => (
      <MaintenanceListItem key={item.maintenance_id} item={item} />
    ))}
  </div>
}