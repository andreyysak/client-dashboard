import { ColumnDef, Row } from '@tanstack/react-table'
import { Trip, useTripStore } from '@/entities/trip'
import { Pen, Trash } from 'lucide-react'
import { useTrips } from '@/entities/trip/api/tripQuery.ts'
import { format } from 'date-fns'

// eslint-disable-next-line react-refresh/only-export-components
const ActionsCell = ({ row }: { row: Row<Trip> }) => {
  const { deleteTrip } = useTrips()

  return (
    <div className="trips__table__actions">
      <button
        onClick={() => deleteTrip(row.original.trip_id)}
        className="trips__table__actions-delete"
      >
        <Trash size={18} />
      </button>
      <button
        onClick={() => {
          useTripStore.getState().setFormType('update')
          useTripStore.getState().setFormOpen(true)
          useTripStore.getState().setCurrentTrip(row.original)
        }}
        className="trips__table__actions-edit"
      >
        <Pen size={18} />
      </button>
    </div>
  )
}

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
    cell: ({getValue}) => {
      const value = getValue<string>()
      if (!value) return ''
      return format(new Date(value), 'PP')
    }
  },
  {
    header: t('trips.actions'),
    enableHiding: false,
    cell: ActionsCell,
  },
]
