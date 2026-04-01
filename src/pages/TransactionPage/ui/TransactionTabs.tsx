import { Button, Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { useTransactionStore } from '@/entities/transactions/model/store.ts'
import { Plus } from 'lucide-react'
import { TransactionTab } from '@/entities/transactions/model/type.ts'

export const TransactionTabs = () => {
  const { t } = useTranslation()
  const { selectedTab, setSelectedTab } = useTransactionStore()

  const tabItems = [
    { key: 'all', label: t('transaction.tabs.all') },
    { key: 'manual', label: t('transaction.tabs.manual') },
    { key: 'bank', label: t('transaction.tabs.bank') },
  ]

  const handleChangeTab = (key: string) => {
    setSelectedTab(key as TransactionTab)
  }

  return (
    <div className="transactions-tabs">
      <Tabs
        type="card"
        activeKey={selectedTab}
        onChange={handleChangeTab}
        items={tabItems}
      />

      <Button shape="square" icon={<Plus />} color="primary" />
    </div>
  )
}
