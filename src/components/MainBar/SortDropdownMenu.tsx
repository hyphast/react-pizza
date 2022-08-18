import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSort } from '../../redux/filter/slice'
import { selectSort } from '../../redux/filter/selectors'
import { TSortType } from '../../redux/filter/types'

type TSortDropdownProps = {
  sortList: TSortType[]
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
}
export const SortDropdownMenu: React.FC<TSortDropdownProps> = ({
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
