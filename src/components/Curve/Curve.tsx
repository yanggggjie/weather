import { clsx } from 'clsx'
import { ICity } from '../../App.js'
import useSWRInfinite from 'swr/infinite'
import * as QueryString from 'qs'
import { useEffect } from 'react'
import CurveDisplay from './CurveDisplay.js'
interface Props {
  cityList: ICity[]
}

function kelvinToCelsius(kelvin: number) {
  return Math.round(kelvin - 273.15)
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

  const Step = 3
  const forecastData = data.map((item) => {
    return {
      name: item.city.name,
      dt_txt_list: item.list.reduce(
        (previousValue, currentValue, currentIndex) => {
          if (currentIndex % Step === 0)
            return [...previousValue, currentValue.dt_txt]
          return previousValue
        },
        [],
      ),
      feels_like_list: item.list.reduce(
        (previousValue, currentValue, currentIndex) => {
          if (currentIndex % Step === 0)
            return [
              ...previousValue,
              kelvinToCelsius(currentValue.main.feels_like),
            ]
          return previousValue
        },
        [],
      ),
    }
  })

  console.log('forecastData', forecastData)

  return (
    <div>
      <CurveDisplay forecastData={forecastData}></CurveDisplay>
    </div>
  )
}

export default Component
