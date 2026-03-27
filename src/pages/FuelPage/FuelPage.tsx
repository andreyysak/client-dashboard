import { useFuels } from '@/entities/fuel/api/query.ts'
import Loader from '@/widgets/Loader'
import { ChevronDown, Fuel } from 'lucide-react'
import {format} from "date-fns";
import {useAppStore} from "@/app/store/useAppStore.ts";

export const FuelPage = () => {
  const { fuels, isLoading } = useFuels()
    const {language} = useAppStore()

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="fuel">
      <div className="fuel__list">
        {fuels.map((fuel) => (
          <div className="fuel-card" key={fuel.gas_id}>
            <div className="fuel-card__bg">
              <Fuel />
            </div>
            <div className="fuel-card__content">
              <div className="fuel-card__header">
                <p className="fuel-card__date">{format(fuel.created_at, 'PP')}</p>
                <button className="fuel-card__button">
                  <ChevronDown />
                </button>
              </div>

              <div className="fuel-card__body">
                <h3 className="fuel-card__title">{fuel.station}</h3>
                <div className="fuel-card__info">
                  <p className="fuel-card__value">
                    {fuel.liters}
                    <span>{language === 'ua' ? 'л' : 'L'}</span>
                  </p>
                  <p className="fuel-card__value">
                      {fuel.price}
                      <span>грн</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}