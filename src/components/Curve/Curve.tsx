import { clsx } from 'clsx'
import { ICity, toShortName } from '../../App.js'
import * as QueryString from 'qs'
import sortObject from '../../utils/sortObject.js'
import globalFetcher from '../../globalFetcher.js'
import dayjs from 'dayjs'
import useSWR from 'swr'
import { zip } from 'lodash-es'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { index2Color } from '../../colors.js'
interface Props {
  cityList: ICity[]
}

function formatDt(dt: number) {
  return dayjs(dt * 1000).format('DD日 H时')
}
function formatTemp(temp: number) {
  return Math.round(temp - 273.15)
}

function Component({ cityList }: Props) {
  function multiFetcher(urls: string[]) {
    return Promise.all(
      urls.map((url) => {
        return globalFetcher(url)
      }),
    )
  }
  const urls = cityList.map((city) => {
    return (
      import.meta.env.VITE_OPEN_WEATHER_BASE_URL +
      '/forecast?' +
      QueryString.stringify(
        sortObject({
          appid: import.meta.env.VITE_OPEN_WEATHER_KEY,
          lat: city.lat,
          lon: city.lon,
        }),
      )
    )
  })

  const { isLoading, error, data } = useSWR(urls, multiFetcher)
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  console.log('city list', cityList)
  const cityWeatherList = data.map((item) => {
    return item.list.map((item1) => {
      return {
        dt: item1.dt,
        temp: item1.main.temp,
      }
    })
  })

  const curveData = zip(...cityWeatherList).map((cols) => {
    const dt = cols[0]['dt']
    const newItem = {
      dt: formatDt(dt),
    }
    cols.forEach((col, index) => {
      const cityName = cityList[index].display_name
      const temp = col['temp']
      newItem[cityName] = formatTemp(temp)
    })

    return newItem
  })

  return (
    <div>
      <LineChart width={1000} height={300} data={curveData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dt" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => {
            return [value + '°C', toShortName(name as unknown as string)]
          }}
        />
        <Legend />
        {cityList.map((city, index) => {
          const name = city.display_name
          return (
            <Line
              type="monotone"
              dataKey={name}
              stroke={index2Color(index)}
              activeDot={{ r: 3 }}
            />
          )
        })}
      </LineChart>
    </div>
  )
}

export default Component
