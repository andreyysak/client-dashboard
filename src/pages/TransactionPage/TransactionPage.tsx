import { TransactionTabs } from '@/pages/TransactionPage/ui/TransactionTabs.tsx'
import { TransactionTable } from '@/pages/TransactionPage/ui/TransactionTable.tsx'

export const TransactionPage = () => {
  return (
    <div className='transactions'>
      <TransactionTabs />
      <TransactionTable />
    </div>
  )
}