import { clsx } from 'clsx'
import { ICity } from '../App.js'
interface Props {
  cityList: ICity[]
}

function Component({ cityList }: Props) {
  return (
    <div>
      {cityList.map((city, index) => {
        const shortName = city.display_name.split(',')[0]

        if (index === 0) return <span key={city.display_name}>{shortName}</span>
        return (
          <div key={city.display_name} className={clsx('inline-block')}>
            <span>vs</span>
            <span>{shortName}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Component
