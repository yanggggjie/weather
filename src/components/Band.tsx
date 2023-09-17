import { clsx } from 'clsx'
import { ICity, toShortName } from '../App.js'
interface Props {
  cityList: ICity[]
}

function Component({ cityList }: Props) {
  return (
    <div className={clsx('space-x-2 font-bold text-2xl')}>
      <span>city:</span>
      {cityList.map((city, index) => {
        const shortName = toShortName(city.display_name)

        if (index === 0) return <span key={city.display_name}>{shortName}</span>
        return (
          <div
            key={city.display_name}
            className={clsx('inline-block', 'space-x-2')}
          >
            <span>vs</span>
            <span>{shortName}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Component
