import {FuelTopBar} from "@/pages/FuelPage/ui/FuelTopBar.tsx";
import {useFuelStore} from "@/entities/fuel/model/store.ts";
import {FuelCardList} from "@/pages/FuelPage/ui/FuelCardList.tsx";
import {FuelTable} from "@/pages/FuelPage/ui/FuelTable.tsx";

export const FuelPage = () => {
    const {layout} = useFuelStore()

  return (
    <div className="fuel">

        <FuelTopBar />

        {
            layout === 'cards'
                ? <FuelCardList />
                : <FuelTable />
        }
    </div>
  )
}
