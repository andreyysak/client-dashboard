import { Garage, GarageApi, useGarageStore } from '@/entities/garage'
import { useEffect } from 'react'
import Loader from '@/widgets/Loader'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { AppRoutes } from '@/shared/consts/AppRoutes.ts'
import { Check } from 'lucide-react'
import { useUserStore } from '@/entities/user'
import { toast } from 'react-toastify'

export const GaragePage = () => {
  const { setCars, isLoading, setLoading, cars } = useGarageStore()
  const { setSelectedCar, selectedCar } = useUserStore()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchGarage = async () => {
      try {
        const data = await GarageApi.getAll()
        setCars(data)
      } catch {
        setCars([])
      } finally {
        setLoading(false)
      }
    }

    fetchGarage()
  }, [setLoading, setCars])

  const handleSelectCar = (e: React.MouseEvent, car: Garage) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedCar(car)
    toast.success(`${car.brand} ${car.model} ${t('garage.selected_success')}`)
  }

  if (isLoading) return <Loader />

  return (
    <div className="garage">
      <h4>{t('garage.title')}</h4>
      <div className="garage__cars">
        {cars.map((car) => {
          const isActive = selectedCar?.car_id === car.car_id

          return (
            <Link
              to={`${AppRoutes.GARAGE.ROOT}/${car.car_id}`}
              className={`garage__cars__item ${isActive ? 'garage__cars__item--active' : ''}`}
              key={car.car_id}
            >
              <div className="garage__cars__item--header">
                <div className="brand-info">
                  <h6>
                    {car.brand} {car.model}
                  </h6>
                  <span className="plate">{car.license_plate}</span>
                </div>
                <span className="year">{car.year}</span>
              </div>

              <div className="garage__cars__item--specs">
                <div className="spec">
                  <span className="label">{t('garage.specs.mileage')}</span>
                  <span className="value">
                    {car.current_mileage?.toLocaleString() || 0}{' '}
                    {t('garage.specs.unit_km')}
                  </span>
                </div>
                <div className="spec">
                  <span className="label">{t('garage.specs.engine')}</span>
                  <span className="value">
                    {car.engine_capacity}L / {car.transmission}
                  </span>
                </div>
                <div className="spec">
                  <span className="label">{t('garage.specs.fuel')}</span>
                  <span className="value">{car.fuel_type}</span>
                </div>
                <div className="spec">
                  <span className="label">{t('garage.specs.color')}</span>
                  <span className="value">{car.color}</span>
                </div>
              </div>

              <div className="garage__cars__item--features">
                {car.features?.stage1 && (
                  <span className="badge badge--power">
                    {t('garage.features.stage1')}
                  </span>
                )}
                {car.features?.sport_exhaust && (
                  <span className="badge">{t('garage.features.sport_exhaust')}</span>
                )}
              </div>

              <div className="garage__cars__item--footer">
                <span className="vin">{car.vin_code}</span>
                <button
                  className={`check ${isActive ? 'check--active' : ''}`}
                  onClick={(e) => handleSelectCar(e, car)}
                >
                  <Check size={18} />
                </button>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
