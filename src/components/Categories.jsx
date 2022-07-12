import React from 'react'

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const categoriesList = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((cat, index) => (
          <li
            key={cat}
            onClick={() => setSelectedCategory(index)}
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
