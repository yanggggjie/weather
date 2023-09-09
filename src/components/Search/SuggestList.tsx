import { clsx } from 'clsx'
import * as React from 'react'
import { ICity } from '../../App.js'
import useSWR from 'swr'
import * as QueryString from 'qs'
import sortQueryOrder from '../../utils/sortQueryOrder.js'
import SuggestListDisplay from './SuggestListDisplay.js'
interface Props {
  searchText: string
  setCityList: React.Dispatch<React.SetStateAction<ICity[]>>
}

function Component({ searchText, setCityList }: Props) {
  const url =
    import.meta.env.VITE_LOCATION_IQ_BASE_URL +
    '/search?' +
    QueryString.stringify({
      key: import.meta.env.VITE_LOCATION_IQ_KEY,
      q: searchText,
      format: 'json',
    })
  const { isLoading, data, error } = useSWR(sortQueryOrder(url))
  if (isLoading) return <div>...loading</div>
  if (error) return <div>error</div>
  const cityList = data.map((item) => {
    return {
      display_name: item.display_name,
      lat: item.lat,
      lon: item.lon,
    }
  })

  return (
    <div className={clsx('w-full bg-white', 'absolute')}>
      <SuggestListDisplay
        cityList={cityList}
        setCityList={setCityList}
      ></SuggestListDisplay>
    </div>
  )
}

export default Component
