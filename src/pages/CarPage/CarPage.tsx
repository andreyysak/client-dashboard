import { useEffect } from 'react'
import { useGarageStore } from '@/entities/garage'
import { useTranslation } from 'react-i18next'
import { Gauge, Fuel, Settings2, Palette, Calendar, Hash } from 'lucide-react'
import Loader from '@/widgets/Loader'
import Breadcrumbs from '@/widgets/Breadcrumbs'

export const CarPage = () => {
  const { id } = useParams<{ id: string }>()
  const carId = Number(id)
  const { t } = useTranslation()
  const { cars, isLoading, fetchCarById } = useGarageStore()

  const car = cars.find((c) => c.car_id === carId)

  useEffect(() => {
    if (!car && carId) {
      fetchCarById(carId)
    }
  }, [carId, car, fetchCarById])

  if (isLoading && !car) return <Loader />
  if (!car) return <div className="car-not-found">{t('garage.errors.not_found')}</div>

  return (
    <div className="car-page">
      <header className="car-page__header">
        <Breadcrumbs />
        <div className="car-page__title-group">
          <h1>
            {car.brand} {car.model}
          </h1>
          <span className="car-page__plate">{car.license_plate}</span>
        </div>
      </header>

      <div className="car-page__content">
        <section className="car-page__main-info">
          <div className="info-grid">
            <div className="info-card">
              <Calendar className="info-card__icon" />
              <div className="info-card__data">
                <span className="label">{t('garage.specs.year')}</span>
                <span className="value">{car.year}</span>
              </div>
            </div>

            <div className="info-card">
              <Gauge className="info-card__icon" />
              <div className="info-card__data">
                <span className="label">{t('garage.specs.mileage')}</span>
                <span className="value">
                  {car.current_mileage?.toLocaleString()} {t('garage.specs.unit_km')}
                </span>
              </div>
            </div>

            <div className="info-card">
              <Fuel className="info-card__icon" />
              <div className="info-card__data">
                <span className="label">{t('garage.specs.fuel')}</span>
                <span className="value">
                  {car.fuel_type} ({car.engine_capacity}L)
                </span>
              </div>
            </div>

            <div className="info-card">
              <Settings2 className="info-card__icon" />
              <div className="info-card__data">
                <span className="label">{t('garage.specs.engine')}</span>
                <span className="value">{car.transmission}</span>
              </div>
            </div>

            <div className="info-card">
              <Palette className="info-card__icon" />
              <div className="info-card__data">
                <span className="label">{t('garage.specs.color')}</span>
                <span className="value">{car.color}</span>
              </div>
            </div>

            <div className="info-card">
              <Hash className="info-card__icon" />
              <div className="info-card__data">
                <span className="label">VIN</span>
                <span className="value vin">{car.vin_code}</span>
              </div>
            </div>
          </div>

          <div className="car-page__features">
            {car.features?.stage1 && (
              <span className="feature-tag feature-tag--power">
                {t('garage.features.stage1')}
              </span>
            )}
            {car.features?.sport_exhaust && (
              <span className="feature-tag">{t('garage.features.sport_exhaust')}</span>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
