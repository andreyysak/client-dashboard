import { useTranslation } from 'react-i18next'
import { CornerDownLeft, X } from 'lucide-react'
import { useFuelStore } from '@/entities/fuel/model/store.ts'
import { useFuels } from '@/entities/fuel/api/query.ts'
import { toast } from 'react-toastify'
import * as React from 'react'

export const FuelModal = () => {
  const { t } = useTranslation()
  const { setFormData, formData, formInputData, setFormInputData } = useFuelStore()
  const { createFuel, updateFuel, fuel } = useFuels()

  const { type, id } = formData
  const { station, price, liters } = formInputData

  React.useEffect(() => {
    if (type === 'patch' && fuel) {
      setFormInputData({
        station: fuel.station,
        price: fuel.price,
        liters: fuel.liters,
      })
    }
  }, [fuel, type, setFormInputData])

  const handleClose = () => {
    setFormData({ isOpen: false, id: 0 })
    setFormInputData({ station: '', price: 0, liters: 0 })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      if (type === 'post') {
        await createFuel(formInputData)
        toast.success(t('fuels.toast_success_create'))
      } else if (type === 'patch' && id) {
        await updateFuel({ id, newFuel: formInputData })
        toast.success(t('fuels.toast_success_update'))
      }

      handleClose()
    } catch (e) {
      toast.error(t('fuels.toast_error'))
      console.error(e)
    }
  }

  return (
    <div className="fuel-modal">
      <form action="" className="fuel-form" onSubmit={handleSubmit}>
        <h2 className="fuel-form__title">
          {type === 'post' ? t('fuels.form_add_title') : t('fuels.form_update_title')}
        </h2>

        <div className="fuel-form__fields">
          <div className="fuel-form__field">
            <label htmlFor="form_station_label" className="fuel-form__label">
              {t('fuels.form_station_label')}
              <input
                id="form_station_label"
                type="text"
                value={station}
                onChange={(e) => setFormInputData({ station: e.target.value })}
                placeholder={t('fuels.form_station_placeholder')}
                className="fuel-form__input"
                required
              />
            </label>
          </div>
          <div className="fuel-form__field">
            <label htmlFor="form_price_label" className="fuel-form__label">
              {t('fuels.form_price_label')}
              <input
                id="form_price_label"
                type="number"
                value={price || ''}
                onChange={(e) => setFormInputData({ price: Number(e.target.value) })}
                placeholder={t('fuels.form_price_placeholder')}
                className="fuel-form__input"
                required
                min="0"
                step="0.01"
              />
            </label>
          </div>
          <div className="fuel-form__field">
            <label htmlFor="form_liters_label" className="fuel-form__label">
              {t('fuels.form_liters_label')}
              <input
                id="form_liters_label"
                type="number"
                value={liters || ''}
                onChange={(e) => setFormInputData({ liters: Number(e.target.value) })}
                placeholder={t('fuels.form_liters_placeholder')}
                className="fuel-form__input"
                required
                min="0"
                step="0.01"
              />
            </label>
          </div>
        </div>

        <button type="submit" className="fuel-form__submit">
          <CornerDownLeft className="fuel-form__icon" />
          {type === 'post' ? t('fuels.form_submit_btn') : t('fuels.form_edit_btn')}
        </button>

        <button type="button" className="fuel-modal__close" onClick={handleClose}>
          <X className="fuel-modal__icon" />
        </button>
      </form>
    </div>
  )
}
