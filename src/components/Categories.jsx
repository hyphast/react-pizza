import React from 'react'
import { useDispatch } from 'react-redux'
import { setCategory } from '../redux/filterSlice/filterSlice'

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
  return (
    <div className="categories">
      <ul>
        {categoriesList.map((cat, index) => (
          <li
            key={cat}
            onClick={() => dispatch(setCategory(index))}
            onKeyDown={() => dispatch(setCategory(index))}
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
