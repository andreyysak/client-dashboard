import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Fuel } from '@/entities/fuel/model/Fuel.ts'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, Pen, Trash } from 'lucide-react'
import { useFuels } from '@/entities/fuel/api/query.ts'
import { format } from 'date-fns'
import { useFuelStore } from '@/entities/fuel/model/store.ts'

export const FuelTable = () => {
  const { t } = useTranslation()
  const columnHelper = createColumnHelper<Fuel>()
  const { fuels, deleteFuel } = useFuels()
  const { pageIndex, pageSize, setPageIndex, setFormData, setColumnVisibility, setColumnFilters, setSorting, columnFilters, columnVisibility, sorting } = useFuelStore()

  const defaultColumns = [
    columnHelper.accessor('gas_id', {
      header: () => t('fuels.col_id'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('station', {
      header: () => t('fuels.col_station'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('price', {
      header: () => t('fuels.col_price'),
      cell: (info) => `${info.getValue()} ${t('fuels.price')}`,
    }),
    columnHelper.accessor('liters', {
      header: () => t('fuels.col_liters'),
      cell: (info) => `${info.getValue()} ${t('fuels.liters')}`,
    }),
    columnHelper.accessor('created_at', {
      header: () => t('fuels.col_date'),
      cell: (info) => format(new Date(info.getValue()), 'PP'),
    }),
    columnHelper.display({
      id: 'actions',
      header: t('fuels.col_actions'),
      cell: (info) => (
        <div className="fuel__table__actions">
          <button
            onClick={() => deleteFuel(info.row.original.gas_id)}
            className="fuel__table__btn fuel__table__btn-delete"
          >
            <Trash />
          </button>
          <button
            onClick={() => setFormData({ isOpen: true, type: 'patch', id: info.row.original.gas_id })}
            className="fuel__table__btn fuel__table__btn-edit"
          >
            <Pen />
          </button>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    columns: defaultColumns,
    data: fuels ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex, pageSize })
        setPageIndex(newState.pageIndex)
      } else {
        setPageIndex(updater.pageIndex)
      }
    },
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      columnVisibility,
      columnFilters,
      sorting,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
  })

  return (
    <div className="fuel__table">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan} onClick={header.column.getToggleSortingHandler()} style={{cursor: 'pointer'}}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            )
          })}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`${Number(row.id) % 2 === 0 ? 'gray-row' : ''}`}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fuel__pagination">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="fuel__pagination-btn"
        >
          <ChevronLeft />
        </button>
        <span>{table.getState().pagination.pageIndex + 1}</span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="fuel__pagination-btn"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
