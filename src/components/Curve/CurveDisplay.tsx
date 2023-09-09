import { clsx } from 'clsx'
import React from 'react'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { index2Color } from '../../colors.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
)

interface IForecastData {
  name: string
  dt_txt_list: string[]
  feels_like_list: number[]
}

interface Props {
  forecastData: IForecastData[]
}
function Component({ forecastData }: Props) {
  console.log('forecastData', forecastData)

  const data = {
    labels: forecastData[0].dt_txt_list,
    datasets: forecastData.map((item, index) => {
      return {
        label: item.name,
        data: item.feels_like_list,
        borderColor: index2Color(index),
        backgroundColor: index2Color(index),
        datalabels: {
          clamp: true,
          color: index2Color(index),
          align: 'end',
          anchor: 'end',
        },
      }
    }),
  }

  console.log('data', data)

  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          datalabels: {
            display: true,
            align: 'top',
            formatter: (value, context) => {
              return `${value}°C`
            },
          },
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'weather trends',
          },
        },
      }}
      data={data}
    />
  )
}
export default Component
