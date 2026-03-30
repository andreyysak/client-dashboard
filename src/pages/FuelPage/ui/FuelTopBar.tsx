import { Button, Dropdown, MenuProps, Space, Tooltip } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Grid2X2, Layout, PlusIcon } from 'lucide-react'
import { useFuelStore } from '@/entities/fuel/model/store.ts'

export const FuelTopBar = () => {
  const { t } = useTranslation()
  const { layout, setLayout, setFormData } = useFuelStore()

  const sortItems: MenuProps['items'] = [
    {
      label: <button>{t('fuels.most_liters')}</button>,
      key: '0',
    },
    {
      label: <button>{t('fuels.least_liters')}</button>,
      key: '1',
    },
    {
      label: <button>{t('fuels.most_money')}</button>,
      key: '2',
    },
    {
      label: <button>{t('fuels.least_money')}</button>,
      key: '3',
    },
    {
      label: <button>{t('fuels.newest')}</button>,
      key: '4',
    },
    {
      label: <button>{t('fuels.oldest')}</button>,
      key: '5',
    },
  ]

  const toggleLayout = () => {
    setLayout(layout === 'cards' ? 'table' : 'cards')
  }

  return (
    <div className="fuel__topbar">
      <div className="fuel__topbar__left">
        <Dropdown
          menu={{ items: sortItems }}
          trigger={['click']}
          className="fuel__topbar__dropdown-menu"
        >
          <a className="fuel__topbar__dropdown" onClick={(e) => e.preventDefault()}>
            <Space>{t('fuels.sort_dropdown')}</Space>
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
      
      <div className="fuel__topbar__right">
        {layout === 'cards' ? (
          <Button
            onClick={toggleLayout}
            shape="square"
            type="default"
            icon={<Grid2X2 />}
          />
        ) : (
          <Button
            onClick={toggleLayout}
            shape="square"
            type="default"
            icon={<Layout />}
          />
        )}

        <Tooltip title={t('fuels.add_fuel')}>
          <Button onClick={() => setFormData({isOpen: true, type: 'post'})} shape="square" type="default" icon={<PlusIcon />} />
        </Tooltip>
      </div>
    </div>
  )
}
