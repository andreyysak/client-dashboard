import { ColumnDef } from '@tanstack/react-table'
import { Trip } from '@/entities/trip'
import { Pen, Trash } from 'lucide-react'

export const getTripColumns = (t: (key: string) => string): ColumnDef<Trip>[] => [
  {
    header: t('trips.col_direction'),
    accessorKey: 'direction',
    enableHiding: false,
  },
  {
    header: t('trips.col_km'),
    accessorKey: 'kilometres',
  },
  {
    header: t('trips.col_car'),
    accessorFn: (row) => row.car?.brand,
  },
  {
    header: t('trips.col_date'),
    accessorKey: 'created_at',
  },
  {
    header: t('trips.actions'),
    enableHiding: false,
    cell: () => (
      <div className="trips__table__actions">
        <button className="trips__table__actions-delete">
          <Trash size={18} />
        </button>
        <button className="trips__table__actions-edit">
          <Pen size={18} />
        </button>
      </div>
    ),
  },
]
