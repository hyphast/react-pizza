import React from 'react'
import { Link } from 'react-router-dom'
import PizzaBlockSkeleton from '../PizzaBlock/PizzaBlockSkeleton'
import PizzaBlock from '../PizzaBlock/PizzaBlock'
import ContentInfo from '../common/ContentInfo/ContentInfo'

const PizzasItems = ({ status, pizzaData }) => {
  const isDataLoading = status === 'loading'

  if (status === 'error') {
    return (
      <ContentInfo
        title="Произошла ошибка"
        desc="Попробуйте снова. Неизвестная ошибка."
      />
    )
  }

  if (!pizzaData.length && !isDataLoading) {
    return (
      <ContentInfo title="Ничего не найдено" desc="Результат отсутствует." />
    )
  }

  return (
    <div className="content__items">
      {isDataLoading
        ? [...new Array(4)].map((_, i) => <PizzaBlockSkeleton key={i} />) // eslint-disable-line react/no-array-index-key
        : pizzaData.map((data) => (
            <Link key={data.id} to={`/pizza/${data.id}`}>
              <PizzaBlock {...data} />
            </Link>
          ))}
    </div>
  )
}

export default PizzasItems
