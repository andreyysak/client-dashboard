import { useFuels } from '@/entities/fuel/api/query.ts'
import Loader from '@/widgets/Loader'
import { FuelCard } from '@/pages/FuelPage/ui/FuelCard.tsx'

export const FuelCardList = () => {
  const { fuels, isLoading } = useFuels()

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="fuel__list">
      {fuels.map((fuel) => (
        <FuelCard key={fuel.gas_id} fuel={fuel} />
      ))}
    </div>
  )
}