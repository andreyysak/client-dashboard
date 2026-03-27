import { useFuels } from '@/entities/fuel/api/query.ts'
import Loader from '@/widgets/Loader'
import { ChevronDown, Pen, Trash } from 'lucide-react'
import { format } from 'date-fns'
import { useAppStore } from '@/app/store/useAppStore.ts'
import { getStationImage } from '@/shared/lib/getImageFuelStation.ts'
import { Dropdown } from 'react-bootstrap'

export const FuelPage = () => {
  const { fuels, isLoading } = useFuels()
  const { language } = useAppStore()

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="fuel">
      <div className="fuel__list">
        {fuels.map((fuel) => (
          <div className="fuel-card" key={fuel.gas_id}>
            <div className="fuel-card__background">
              <img
                src={getStationImage(fuel.station)}
                alt={`${fuel.station} background`}
              />
            </div>
            <div className="fuel-card__content">
              <div className="fuel-card__header">
                <p className="fuel-card__date">
                  {format(new Date(fuel.created_at), 'PP')}
                </p>

                <Dropdown drop='start' className="fuel-card__dropdown">
                  <Dropdown.Toggle as="button" className="fuel-card__button">
                    <ChevronDown />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="fuel-card__menu">
                    <Dropdown.Item className="fuel-card__item">
                      <button className="fuel-card__action fuel-card__action--delete">
                        <Trash />
                        <span>{language === 'ua' ? 'Видалити' : 'Delete'}</span>
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item className="fuel-card__item">
                      <button className="fuel-card__action fuel-card__action--edit">
                        <Pen />
                        <span>{language === 'ua' ? 'Редагувати' : 'Edit'}</span>
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="fuel-card__body">
                <h3 className="fuel-card__title">{fuel.station}</h3>
                <div className="fuel-card__info">
                  <p className="fuel-card__value">
                    {fuel.liters}
                    <span>{language === 'ua' ? ' л' : ' L'}</span>
                  </p>
                  <p className="fuel-card__value">
                    {fuel.price}
                    <span>{language === 'ua' ? ' грн' : ' UAH'}</span>
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
