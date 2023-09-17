import { clsx } from 'clsx'
import * as React from 'react'
import { ICity } from '../../App.js'
import { useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import SuggestList from './SuggestList.js'
interface Props {
  cityList: ICity[]
  setCityList: React.Dispatch<React.SetStateAction<ICity[]>>
}

function Component({ cityList, setCityList }: Props) {
  const [searchText, setSearchText] = useState<string>('成都')
  const [showSuggest, setShowSuggest] = useState<boolean>(false)
  const debouncedSearchText = useDebounce(searchText, 500)

  function handleSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value)
  }

  function handleInputFocus() {
    setShowSuggest(true)
  }
  function handleInputBlur() {
    setShowSuggest(false)
  }

  return (
    <div className={clsx('flex flex-row items-center gap-2')}>
      <div className={clsx('w-80 ', 'relative')}>
        <input
          className={clsx('w-full rounded-md border-2')}
          type="text"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={searchText}
          onChange={handleSearchTextChange}
        />
        {showSuggest && searchText !== '' && (
          <div
            className={clsx(
              'outline p-1',
              'absolute z-10 bg-white',
              'w-full h-80 overflow-y-scroll',
            )}
          >
            <SuggestList
              cityList={cityList}
              searchText={debouncedSearchText}
              setCityList={setCityList}
            ></SuggestList>
          </div>
        )}
      </div>
      <span className={clsx('font-light')}>search to add</span>
    </div>
  )
}

export default Component
