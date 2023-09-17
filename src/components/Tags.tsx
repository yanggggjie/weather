import { clsx } from 'clsx'
import { ICity } from '../App.js'
import { RxCross2 } from 'react-icons/rx/index.js'
import { index2Color } from '../colors.js'
interface Props {
  cityList: ICity[]
  setCityList: React.Dispatch<React.SetStateAction<ICity[]>>
}

function Component({ cityList, setCityList }: Props) {
  return (
    <div className={clsx('flex flex-row items-center gap-2')}>
      {cityList.map((city, index) => {
        const shortName = city.display_name.split(',')[0]

        function handleRemove() {
          setCityList((prev) => {
            return prev.filter((item) => {
              return item.display_name !== city.display_name
            })
          })
        }

        return (
          <div
            style={{
              borderColor: index2Color(index),
            }}
            className={clsx(
              'flex flex-row items-center gap-2',
              'px-2 py-1',
              'border-2 rounded-md',
            )}
            key={city.display_name}
          >
            {shortName}
            <span
              className={clsx(
                'text-red-500 text-3xl',
                'hover:rotate-90 transition-transform duration-600',
              )}
              onClick={handleRemove}
            >
              <RxCross2></RxCross2>
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default Component
