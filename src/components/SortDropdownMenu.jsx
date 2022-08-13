import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSort, setSort } from '../redux/filterSlice/filterSlice'

const SortDropdownMenu = ({ sortList, setIsDropdownVisible }) => {
  const dispatch = useDispatch()
  const selectedSort = useSelector(selectSort)
  const handleSort = (sort) => {
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
              selectedSort.sortProperty === sortList.sortProperty
                ? 'active'
                : ''
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
