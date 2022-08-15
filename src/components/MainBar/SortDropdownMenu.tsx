import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSort, setSort } from '../../redux/filterSlice/filterSlice'
import { SortItem } from './types'

type SortDropdownProps = {
  sortList: SortItem[]
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
}
const SortDropdownMenu: React.FC<SortDropdownProps> = ({
  sortList,
  setIsDropdownVisible,
}) => {
  const dispatch = useDispatch()
  const selectedSort = useSelector(selectSort)
  const handleSort = (sort: SortItem): void => {
    dispatch(setSort(sort))
    setIsDropdownVisible(false)
  }

  return (
    <div className="sort__popup">
      <ul>
        {sortList.map((sort: SortItem) => (
          <li
            key={sort.sortProperty}
            className={
              sort.sortProperty === selectedSort.sortProperty ? 'active' : ''
            }
            onClick={() => handleSort(sort)}
            onKeyDown={() => handleSort(sort)}
          >
            {sort.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SortDropdownMenu
