import * as React from 'react'
import { X } from 'lucide-react'
import { useTripStore } from '@/entities/trip'
import { useTranslation } from 'react-i18next'
import { useTrips } from '@/entities/trip/api/tripQuery.ts'
import { getTripSchema } from '@/shared/validation/trip.schema.ts'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/shared/api/axios.ts'
import { useUserStore } from '@/entities/user'

interface Props {
  type: 'create' | 'update'
}

type TripFormValues = {
  kilometres: number
  direction: string
}

export const TripForm: React.FC<Props> = ({ type }) => {
  const { t } = useTranslation()
  const { setFormOpen, formType, currentTrip, setCurrentTrip } = useTripStore()
  const { createTrip, updateTrip } = useTrips()
  const { selectedCar } = useUserStore()

  const tripSchema = getTripSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema) as never,
    defaultValues: {
      kilometres:
        formType === 'update' && currentTrip ? Number(currentTrip.kilometres) : undefined,
      direction: formType === 'update' && currentTrip ? currentTrip.direction : '',
    },
    mode: 'onChange',
  })

  const handleClose = () => {
    setFormOpen(false)
    setCurrentTrip(null)
  }

  const onSubmit: SubmitHandler<TripFormValues> = async (data) => {
    try {
      if (formType === 'create') {
        if (!selectedCar?.car_id) {
          toast.error('Автомобіль не вибрано')
          return
        }

        await createTrip({
          car_id: Number(selectedCar.car_id),
          kilometres: data.kilometres,
          direction: data.direction,
        })
      } else if (formType === 'update' && currentTrip) {
        await updateTrip({
          id: currentTrip.trip_id,
          kilometres: data.kilometres,
          direction: data.direction,
        })
      }
      handleClose()
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const getBorderColor = (fieldName: keyof TripFormValues) => {
    if (errors[fieldName]) return 'var(--color-error)'
    if (touchedFields[fieldName] && !errors[fieldName]) return 'var(--color-success)'
    return undefined
  }

  return (
    <div className="trip-form">
      <div className="trip-form__modal">
        <button type="button" className="trip-form__close" onClick={handleClose}>
          <X />
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="trip-form__form">
          <h2>
            {type === 'create'
              ? t('trips.form.label_create')
              : t('trips.form.label_update')}
          </h2>

          <label htmlFor="trip_kilometres">
            {t('trips.form.input_kilometres')}
            <input
              id="trip_kilometres"
              type="number"
              placeholder={t('trips.form.input_kilometres')}
              style={{ borderColor: getBorderColor('kilometres') }}
              {...register('kilometres', { valueAsNumber: true })}
            />
            {errors.kilometres && (
              <span
                style={{
                  color: 'var(--color-error)',
                  fontSize: '12px',
                  marginTop: '4px',
                }}
              >
                {errors.kilometres.message}
              </span>
            )}
          </label>

          <label htmlFor="trip_direction">
            {t('trips.form.input_direction')}
            <input
              id="trip_direction"
              type="text"
              placeholder={t('trips.form.input_direction')}
              style={{ borderColor: getBorderColor('direction') }}
              {...register('direction')}
            />
            {errors.direction && (
              <span
                style={{
                  color: 'var(--color-error)',
                  fontSize: '12px',
                  marginTop: '4px',
                }}
              >
                {errors.direction.message}
              </span>
            )}
          </label>

          <button type="submit" disabled={isSubmitting}>
            {type === 'create' ? t('trips.form.btn_create') : t('trips.form.btn_update')}
          </button>
        </form>
      </div>
    </div>
  )
}
