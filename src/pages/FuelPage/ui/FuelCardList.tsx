import { useFuels } from '@/entities/fuel/api/query.ts'
import Loader from '@/widgets/Loader'
import { FuelCard } from '@/pages/FuelPage/ui/FuelCard.tsx'
import { useTranslation } from 'react-i18next'
import { useFuelStore } from '@/entities/fuel/model/store.ts'
import { Redo2 } from 'lucide-react'

export const FuelCardList = () => {
  const { fuels, isLoading } = useFuels()
  const {defaultCardListLength, setDefaultCardListLength} = useFuelStore()
  const {t} = useTranslation()

  const handleExpandList = () => {
    setDefaultCardListLength(defaultCardListLength + 4)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className="fuel__list">
        {fuels
          .map((fuel) => <FuelCard key={fuel.gas_id} fuel={fuel} />)
          .slice(0, defaultCardListLength)}
      </div>

      {fuels.length > defaultCardListLength && (
        <button onClick={handleExpandList} className="fuel__show-more">
          <Redo2 />
          {t('fuels.show_more')}
        </button>
      )}
    </>
  )
}