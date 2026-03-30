import {FuelTopBar} from "@/pages/FuelPage/ui/FuelTopBar.tsx";
import {useFuelStore} from "@/entities/fuel/model/store.ts";
import {FuelCardList} from "@/pages/FuelPage/ui/FuelCardList.tsx";
import {FuelTable} from "@/pages/FuelPage/ui/FuelTable.tsx";
import { FuelModal } from '@/pages/FuelPage/ui/FuelModal.tsx'

export const FuelPage = () => {
    const {layout, formData} = useFuelStore()

  return (
    <div className="fuel">

        <FuelTopBar />

        {
            layout === 'cards'
                ? <FuelCardList />
                : <FuelTable />
        }

      {formData.isOpen && <FuelModal />}
    </div>
  )
}
