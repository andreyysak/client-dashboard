import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Transaction } from '@/entities/transactions/model/type.ts'
import { useTransactions } from '@/entities/transactions/api/query.ts'
import Loader from '@/widgets/Loader'
import { useTransactionStore } from '@/entities/transactions/model/store.ts'
import { format } from 'date-fns'
import { uk, enUS } from 'date-fns/locale'
import { useAppStore } from '@/app/store/useAppStore.ts'

export const TransactionTable = () => {
  const { t } = useTranslation()
  const {language} = useAppStore()
  const {
    transactions,
    manualTransactions,
    monoTransactions,
    isLoading,
    isLoadingManual,
    isLoadingMono,
  } = useTransactions()
  const { selectedTab } = useTransactionStore()

  const tableData = useMemo(() => {
    switch (selectedTab) {
      case 'all':
        return transactions
      case 'bank':
        return monoTransactions
      case 'manual':
        return manualTransactions
      default:
        return transactions
    }
  }, [manualTransactions, monoTransactions, selectedTab, transactions])

  const categoryFilters = useMemo(() => {
    const uniqueCategories = new Set(
      tableData.map((item) => item.category?.name).filter(Boolean),
    )
    return Array.from(uniqueCategories).map((category) => ({
      text: category,
      value: category,
    }))
  }, [tableData])

  const columns: ColumnsType<Transaction> = [
    {
      title: t('transaction.columns.id'),
      dataIndex: 'transaction_id',
      key: 'transaction_id',
      sorter: (a, b) => String(a.transaction_id).localeCompare(String(b.transaction_id)),
    },
    {
      title: t('transaction.columns.type'),
      dataIndex: ['category', 'type'],
      key: 'type',
      filters: [
        { text: t('transaction.types.income'), value: 'income' },
        { text: t('transaction.types.expense'), value: 'expense' },
      ],
      onFilter: (value, record) => record.category?.type === value,
      render: (type: 'expense' | 'income') => {
        if (!type) return null

        const color = type === 'income' ? 'success' : 'error'
        return <Tag color={color}>{t(`transaction.types.${type}`).toUpperCase()}</Tag>
      },
    },
    {
      title: t('transaction.columns.category'),
      dataIndex: ['category', 'name'],
      key: 'category',
      filters: categoryFilters,
      onFilter: (value, record) => record.category?.name === (value as string),
      sorter: (a, b) => (a.category?.name || '').localeCompare(b.category?.name || ''),
    },
    {
      title: t('transaction.columns.amount'),
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount, record) => {
        const isIncome = record.category?.type === 'income'
        return (
          <span
            style={{
              color: isIncome ? 'var(--color-success, #52c41a)' : 'inherit',
              fontWeight: isIncome ? 500 : 'normal',
            }}
          >
            {isIncome ? '+' : ''}
            {amount}
          </span>
        )
      },
    },
    {
      title: t('transaction.columns.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('transaction.columns.date'),
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (text) => (text ? format(new Date(text), 'Pp', {locale: language === 'ua' ? uk : enUS}) : ''),
    },
  ]

  if (isLoading || isLoadingMono || isLoadingManual) {
    return <Loader />
  }

  return (
    <div className="transactions-table">
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="transaction_id"
        pagination={{ placement: ['bottomCenter'] }}
        scroll={{ x: 800 }}
      />
    </div>
  )
}
