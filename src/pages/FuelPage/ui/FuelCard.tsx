import { Fuel } from '@/entities/fuel/model/Fuel.ts'
import * as React from 'react'
import { getStationImage } from '@/shared/lib/getImageFuelStation.ts'
import { format } from 'date-fns'
import { Dropdown } from 'antd'
import { ChevronDown, Pen, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Props {
  fuel: Fuel
}

export const FuelCard: React.FC<Props> = ({fuel}) => {
  const { t } = useTranslation()

  const getDropdownItems = () => [
    {
      key: 'delete',
      className: 'fuel-card__item',
      label: (
        <div className="fuel-card__action fuel-card__action--delete">
          <Trash />
          <span>{t('fuels.delete_fuel')}</span>
        </div>
      ),
    },
    {
      key: 'edit',
      className: 'fuel-card__item',
      label: (
        <div className="fuel-card__action fuel-card__action--edit">
          <Pen />
          <span>{t('fuels.edit_fuel')}</span>
        </div>
      ),
    },
  ]

  const dropdownItems = getDropdownItems()

  return (
    <div className="fuel-card" key={fuel.gas_id}>
      <div className="fuel-card__background">
        <img src={getStationImage(fuel.station)} alt={`${fuel.station} background`} />
      </div>
      <div className="fuel-card__content">
        <div className="fuel-card__header">
          <p className="fuel-card__date">{format(new Date(fuel.created_at), 'PP')}</p>

          <div className="fuel-card__dropdown">
            <Dropdown
              menu={{ items: dropdownItems, className: 'fuel-card__menu' }}
              trigger={['click']}
              placement="bottomRight"
            >
              <button className="fuel-card__button">
                <ChevronDown />
              </button>
            </Dropdown>
          </div>
        </div>

        <div className="fuel-card__body">
          <h3 className="fuel-card__title">{fuel.station}</h3>
          <div className="fuel-card__info">
            <p className="fuel-card__value">
              {fuel.liters}
              <span>{t('fuels.liters')}</span>
            </p>
            <p className="fuel-card__value">
              {fuel.price}
              <span>{t('fuels.price')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}