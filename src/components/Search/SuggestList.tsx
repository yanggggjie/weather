import { clsx } from 'clsx'
import * as React from 'react'
import { ICity } from '../../App.js'
import useSWR from 'swr'
import * as QueryString from 'qs'
import sortQuery from '../../utils/sortQuery.js'
interface Props {
  cityList: ICity[]
  searchText: string
  setCityList: React.Dispatch<React.SetStateAction<ICity[]>>
}

function Component({ cityList, searchText, setCityList }: Props) {
  const url =
    import.meta.env.VITE_LOCATION_IQ_BASE_URL +
    '/search?' +
    QueryString.stringify({
      key: import.meta.env.VITE_LOCATION_IQ_KEY,
      q: searchText,
      format: 'json',
    })
  const { isLoading, data, error } = useSWR(sortQuery(url))
  if (isLoading) return <div>...loading</div>
  if (error) return <div>error</div>
  const suggestedCityList = data.map((item) => {
    return {
      display_name: item.display_name,
      lat: item.lat,
      lon: item.lon,
    }
  })
  const filteredExistCityList = suggestedCityList.filter((item) => {
    return !cityList.some((city) => {
      return city.display_name === item.display_name
    })
  })

  function handleMouseDown(city: ICity) {
    setCityList((prev) => {
      if (
        cityList.some((item) => {
          return item.display_name === city.display_name
        })
      )
        return prev
      return [...prev, city]
    })
  }

  return (
    <div className={clsx('w-full space-y-3')}>
      {filteredExistCityList.map((city) => {
        const uniqueKey = city.lon + city.lat
        return (
          <div
            key={uniqueKey}
            onMouseDown={() => {
              handleMouseDown(city)
            }}
            className={clsx('hover:bg-gray-200')}
          >
            {city.display_name}
          </div>
        )
      })}
    </div>
  )
}

export default Component
