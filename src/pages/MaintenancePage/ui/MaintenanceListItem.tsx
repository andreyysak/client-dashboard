import { Maintenance } from '@/entities/maintenance/model/Maintenance.ts'
import * as React from 'react'
import { format } from 'date-fns'
import { uk, enUS } from 'date-fns/locale'
import { useAppStore } from '@/app/store/useAppStore.ts'
import { useTranslation } from 'react-i18next'
import { Pen, Trash } from 'lucide-react'
import { useMaintenance } from '@/entities/maintenance/api/query.ts'
import { useMaintenanceStore } from '@/entities/maintenance/model/store.ts'

interface Props {
  item: Maintenance
}

export const MaintenanceListItem: React.FC<Props> = ({ item }) => {
  const language = useAppStore.getState().language
  const { t } = useTranslation()
  const { deleteMaintenance } = useMaintenance()
  const { setForm, setCurrentMaintenance } = useMaintenanceStore()

  const handleEdit = () => {
    setCurrentMaintenance(item)
    setForm({ isOpen: true, type: 'patch' })
  }

  return (
    <div className="maintenance__item">
      <p className="maintenance__item-id">{item.maintenance_id}</p>
      <div className="maintenance__item-info">
        <div className="maintenance__item-top">
          <h4 className="maintenance__item-description">{item.description}</h4>

          <p className="maintenance__item-date">
            {format(new Date(item.date), 'PPP', {
              locale: language === 'ua' ? uk : enUS,
            })}
          </p>
        </div>
        <div className="maintenance__item-bottom">
          <div className="maintenance__item-general">
            <p className="maintenance__item-car">
              {item.car.brand} {item.car.model}
            </p>
            <p className="maintenance__item-odometer">
              {item.odometer} {t('maintenance.km')}
            </p>
          </div>
          <p
            className={`${item.cost > 0 ? 'maintenance__item-cost' : 'maintenance__item-cost-empty'}`}
          >
            {item.cost > 0 ? item.cost : t('maintenance.no_cost')}
          </p>
        </div>
      </div>

      <div className="maintenance__item-actions">
        <button
          onClick={handleEdit}
          className="maintenance__item-actions-btn maintenance__item-actions-btn-edit"
        >
          <Pen />
        </button>
        <button
          onClick={() => deleteMaintenance(item.maintenance_id)}
          className="maintenance__item-actions-btn maintenance__item-actions-btn-delete"
        >
          <Trash />
        </button>
      </div>
    </div>
  )
}
