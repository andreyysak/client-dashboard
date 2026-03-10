import { useTranslation } from 'react-i18next'
import {
  ChartArea,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Loader,
  Minus,
  PlusIcon,
  Settings2,
} from 'lucide-react'
import { getTripColumns, useTripStore } from '@/entities/trip'
import { useTrips } from '@/entities/trip/api/tripQuery.ts'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'
import excelIco from '@/assets/icons/excel.svg';
import pdfIco from '@/assets/icons/pdf.svg';

export const TripsPage = () => {
  const { t } = useTranslation()
  const {view, setView, perPage, setPerPage, pageIndex, setPageIndex, columnVisibility, setColumnVisibility, openDropdown, setOpenDropDown, columnFilters, setColumnFilters, sorting, setSorting, globalFilter, setGlobalFilter} = useTripStore()
  const {trips, isLoading} = useTrips()

  const columns = useMemo(() => getTripColumns(t), [t])

  const table = useReactTable({
    data: trips,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      columnFilters,
      sorting,
      globalFilter,
      pagination: {
        pageIndex,
        pageSize: perPage,
      },
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize: perPage })
          : updater

      setPageIndex(newPagination.pageIndex)
      setPerPage(newPagination.pageSize)
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="trips">
      <div className="trips__topbar">
        <div className="trips__topbar__input">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={t('trips.search_placeholder')}
          />
        </div>
        <div className="trips__topbar__tools">
          <div className="trips__topbar__tools-columns">
            <button
              className={openDropdown ? 'active' : ''}
              onClick={() => setOpenDropDown(!openDropdown)}
            >
              <Settings2 size={18} />
              <span>{t('trips.column_btn')}</span>
            </button>

            <div
              className={`trips__topbar__tools-columns-menu ${openDropdown ? 'active' : ''}`}
            >
              {table.getAllLeafColumns().map((column) => (
                <div key={column.id} className="trips__topbar__tools-columns-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                    />
                    <span>{column.id}</span>
                  </label>

                  {column.getCanFilter() && (
                    <input
                      type="text"
                      className="trips__topbar__tools-columns-filter"
                      value={(column.getFilterValue() ?? '') as string}
                      onChange={(e) => column.setFilterValue(e.target.value)}
                      placeholder={`Filter ${column.id}...`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="trips__topbar__tools-perpage">
            <button onClick={() => setPerPage(perPage - 1)}>
              <Minus />
            </button>
            <input
              type="number"
              value={perPage}
              onChange={(event) => setPerPage(Number(event.target.value))}
            />
            <button onClick={() => setPerPage(perPage + 1)}>
              <PlusIcon />
            </button>
          </div>
          <button
            className="trips__topbar__tools-icon"
            onClick={() => setView(view === 'table' ? 'cards' : 'table')}
          >
            {view === 'table' ? <List /> : <LayoutGrid />}
          </button>
          <button className="trips__topbar__tools-icon">
            <ChartArea />
          </button>
          <button className="trips__topbar__tools-icon">
            <img src={excelIco} alt="excel" />
          </button>
          <button className="trips__topbar__tools-icon">
            <img src={pdfIco} alt="pdf" />
          </button>
          <button className="trips__topbar__tools-add">
            <PlusIcon />
            {t('trips.add_btn')}
          </button>
        </div>
      </div>

      <table className="trips__table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: 'pointer' }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getPaginationRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="trips__pagination">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </button>

        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}