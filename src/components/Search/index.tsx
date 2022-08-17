import React, { useCallback, useRef, useState } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from '../../utils/debounce'
import {
  selectSearchValue,
  setSearchValue,
} from '../../redux/filterSlice/filterSlice'
import styles from './Search.module.scss'

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const searchValue = useSelector(selectSearchValue)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState(searchValue)

  const clearInput = (): void => {
    dispatch(setSearchValue(''))
    setInputValue('')
    inputRef.current?.focus()
  }

  const debounceInput = useCallback(
    debounce((val: string) => dispatch(setSearchValue(val)), 350),
    []
  )

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
    debounceInput(e.target.value)
  }

  return (
    <div className={styles.root}>
      <svg viewBox="0 0 512 512" className={styles.icon}>
        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
      </svg>
      <input
        ref={inputRef}
        className={classnames(styles.input, {
          [styles.filledInput]: !!searchValue,
        })}
        placeholder="Поиск пиццы..."
        value={inputValue}
        onChange={onChangeInput}
      />
      {searchValue && (
        <svg
          viewBox="0 0 512 512"
          className={styles.clear}
          onClick={clearInput}
        >
          <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
        </svg>
      )}
    </div>
  )
}

export default Search
