import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSort,
  setSort,
  TSortType,
} from '../../redux/filterSlice/filterSlice'

type TSortDropdownProps = {
  sortList: TSortType[]
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
}
const SortDropdownMenu: React.FC<TSortDropdownProps> = ({
  sortList,
  setIsDropdownVisible,
}) => {
  const dispatch = useDispatch()
  const selectedSort = useSelector(selectSort)
  const handleSort = (sort: TSortType): void => {
    dispatch(setSort(sort))
    setIsDropdownVisible(false)
  }

  return (
    <div className="sort__popup">
      <ul>
        {sortList.map((sort) => (
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
