import { clsx } from 'clsx'
import { ICity } from '../../App.js'
import useSWRInfinite from 'swr/infinite'
import * as QueryString from 'qs'
import { useEffect } from 'react'
import CurveDisplay from './CurveDisplay.js'
interface Props {
  cityList: ICity[]
}

function Component({ cityList }: Props) {
  const { data, isLoading, error, setSize } = useSWRInfinite((index) => {
    const city = cityList[index]
    return (
      import.meta.env.VITE_OPEN_WEATHER_BASE_URL +
      '/forecast?' +
      QueryString.stringify({
        appid: import.meta.env.VITE_OPEN_WEATHER_KEY,
        lat: city.lat,
        lon: city.lon,
      })
    )
  })
  useEffect(() => {
    setSize(cityList.length)
  }, [setSize])
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  console.log('data', data)

  return (
    <div>
      <CurveDisplay></CurveDisplay>
    </div>
  )
}

export default Component
