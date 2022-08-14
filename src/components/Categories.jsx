import React from 'react'
import { useDispatch } from 'react-redux'
import { setCategory, setCurrentPage } from '../redux/filterSlice/filterSlice'

const categoriesList = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

const Categories = ({ selectedCategory }) => {
  const dispatch = useDispatch()

  const onClickCategory = (index) => {
    dispatch(setCategory(index))
    dispatch(setCurrentPage(1))
  }
  const onKeyDownCategory = (index) => {
    dispatch(setCategory(index))
    dispatch(setCurrentPage(1))
  }

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((cat, index) => (
          <li
            key={cat}
            onClick={() => onClickCategory(index)}
            onKeyDown={() => onKeyDownCategory(index)}
            className={selectedCategory === index ? 'active' : ''}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
