import { Button, Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { useTransactionStore } from '@/entities/transactions/model/store.ts'
import { Plus } from 'lucide-react'

export const TransactionTabs = () => {
  const {t} = useTranslation()
  const {setSelectedTab} = useTransactionStore()
  const tabs = [
    t('transaction.tabs.all'),
    t('transaction.tabs.manual'),
    t('transaction.tabs.bank'),
  ]

  const handleChangeTab = (tab: string) => {
    setSelectedTab(tab.toLowerCase())
  }

  return (
    <div className='transactions-tabs'>
      <Tabs type='card' onChange={event => handleChangeTab(event)} items={tabs.map((tab) => {
        return {
          label: tab,
          key: tab
        }
      })} />

      <Button shape='square' icon={<Plus />} color='primary' />
    </div>
  )
}