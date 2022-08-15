import React from 'react'
import { useDispatch } from 'react-redux'
import {
  setCategory,
  setCurrentPage,
} from '../../redux/filterSlice/filterSlice'

const categoriesList: string[] = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

type CategoriesProps = {
  selectedCategory: number
}
const Categories: React.FC<CategoriesProps> = ({ selectedCategory }) => {
  const dispatch = useDispatch()

  const onClickCategory = (cat: number): void => {
    dispatch(setCategory(cat))
    dispatch(setCurrentPage(1))
  }
  const onKeyDownCategory = (cat: number): void => {
    dispatch(setCategory(cat))
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
