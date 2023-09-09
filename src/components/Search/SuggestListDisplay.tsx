import { clsx } from 'clsx'
import { ICity } from '../../App.js'
import * as React from 'react'
interface Props {
  cityList: ICity[]
  setCityList: React.Dispatch<React.SetStateAction<ICity[]>>
}

function Component({ cityList, setCityList }: Props) {
  function handleMouseDown(city: ICity) {
    setCityList((prev) => {
      if (
        prev.some((item) => {
          return item.display_name === city.display_name
        })
      )
        return prev
      return [...prev, city]
    })
  }
  return (
    <div className={clsx('space-y-3')}>
      {cityList.map((city) => {
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
