import { clsx } from 'clsx'
import * as React from 'react'
import { ICity } from '../../App.js'
import { useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import SuggestList from './SuggestList.js'
interface Props {
  setCityList: React.Dispatch<React.SetStateAction<ICity[]>>
}

function Component({ setCityList }: Props) {
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
    <div className={clsx('w-96 ', 'relative')}>
      <input
        className={clsx('w-full')}
        type="text"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={searchText}
        onChange={handleSearchTextChange}
      />
      {showSuggest && searchText !== '' && (
        <SuggestList
          searchText={debouncedSearchText}
          setCityList={setCityList}
        ></SuggestList>
      )}
    </div>
  )
}

export default Component
