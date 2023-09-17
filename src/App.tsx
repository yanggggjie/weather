import { clsx } from 'clsx'
import Title from './components/Title.js'
import Band from './components/Band.js'
import Search from './components/Search/Search.js'
import Tags from './components/Tags.js'
import Curve from './components/Curve/Curve.js'
import { useLocalStorage } from 'usehooks-ts'
export interface ICity {
  display_name: string
  lon: string
  lat: string
}

export function toShortName(display_name: string) {
  return display_name.split(',')[0]
}

function Component() {
  const [cityList, setCityList] = useLocalStorage<ICity[]>('cityList', [
    {
      display_name: '北京',
      lon: '116.407396',
      lat: '39.904199',
    },
    {
      display_name: '上海',
      lon: '121.473701',
      lat: '31.230416',
    },
  ])
  return (
    <div className={clsx('p-5', 'space-y-3')}>
      <Title></Title>
      <Band cityList={cityList}></Band>
      <Tags cityList={cityList} setCityList={setCityList}></Tags>
      <Search cityList={cityList} setCityList={setCityList}></Search>
      {cityList.length > 0 && <Curve cityList={cityList}></Curve>}
    </div>
  )
}

export default Component
