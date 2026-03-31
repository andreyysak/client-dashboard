import { useMaintenanceStore } from '@/entities/maintenance/model/store.ts'
import { useMaintenance } from '@/entities/maintenance/api/query.ts'
import { useUserStore } from '@/entities/user'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/shared/api/axios.ts'
import { getMaintenanceSchema } from '@/shared/validation/maintenance.schema.ts'

type MaintenanceFormValues = {
  odometer: number
  description: string
  cost?: number
}

export const MaintenanceForm = () => {
  const { form, setForm, currentMaintenance, setCurrentMaintenance } =
    useMaintenanceStore()
  const { create, patch } = useMaintenance()
  const { selectedCar } = useUserStore()
  const { t } = useTranslation()

  const maintenanceSchema = getMaintenanceSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceSchema) as never,
    defaultValues: {
      odometer:
        form.type === 'patch' && currentMaintenance
          ? currentMaintenance.odometer
          : undefined,
      description:
        form.type === 'patch' && currentMaintenance ? currentMaintenance.description : '',
      cost:
        form.type === 'patch' && currentMaintenance ? currentMaintenance.cost : undefined,
    },
    mode: 'onChange',
  })

  const handleClose = () => {
    setForm({ isOpen: false })
    setCurrentMaintenance(null)
  }

  const onSubmit: SubmitHandler<MaintenanceFormValues> = async (data) => {
    try {
      if (form.type === 'post') {
        if (!selectedCar?.car_id) {
          toast.error(t('maintenance.form_error_no_car'))
          return
        }

        await create({
          car_id: Number(selectedCar.car_id),
          odometer: data.odometer,
          description: data.description,
          cost: data.cost,
        })
      } else if (form.type === 'patch' && currentMaintenance) {
        await patch({
          id: currentMaintenance.maintenance_id,
          data: {
            car_id: currentMaintenance.car_id,
            odometer: data.odometer,
            description: data.description,
            cost: data.cost,
          },
        })
      }
      handleClose()
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const getBorderColor = (fieldName: keyof MaintenanceFormValues) => {
    if (errors[fieldName]) return 'var(--color-error)'
    if (touchedFields[fieldName] && !errors[fieldName]) return 'var(--color-success)'
    return undefined
  }

  return (
    <div className="maintenance-modal">
      <div className="maintenance-form">
        <button type="button" onClick={handleClose} className="maintenance-form__close">
          <X />
        </button>

        <h2 className="maintenance-form__title">
          {form.type === 'post'
            ? t('maintenance.form_title_add')
            : t('maintenance.form_title_edit')}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="maintenance-form__form">
          <label htmlFor="odometer" className="maintenance-form__label">
            {t('maintenance.form_odometer_label')}
            <input
              id="odometer"
              type="number"
              className="maintenance-form__input"
              placeholder={t('maintenance.form_odometer_placeholder')}
              style={{ borderColor: getBorderColor('odometer') }}
              {...register('odometer', { valueAsNumber: true })}
            />
            {errors.odometer && (
              <span className="maintenance-form__error">{errors.odometer.message}</span>
            )}
          </label>

          <label htmlFor="description" className="maintenance-form__label">
            {t('maintenance.form_description_label')}
            <input
              id="description"
              type="text"
              className="maintenance-form__input"
              placeholder={t('maintenance.form_description_placeholder')}
              style={{ borderColor: getBorderColor('description') }}
              {...register('description')}
            />
            {errors.description && (
              <span className="maintenance-form__error">
                {errors.description.message}
              </span>
            )}
          </label>

          <label htmlFor="cost" className="maintenance-form__label">
            {t('maintenance.form_cost_label')}
            <input
              id="cost"
              type="number"
              className="maintenance-form__input"
              placeholder={t('maintenance.form_cost_placeholder')}
              style={{ borderColor: getBorderColor('cost') }}
              {...register('cost', { valueAsNumber: true })}
            />
            {errors.cost && (
              <span className="maintenance-form__error">{errors.cost.message}</span>
            )}
          </label>

          <button type="submit" className="maintenance-form__btn" disabled={isSubmitting}>
            {form.type === 'post'
              ? t('maintenance.form_btn_add')
              : t('maintenance.form_btn_edit')}
          </button>
        </form>
      </div>
    </div>
  )
}
