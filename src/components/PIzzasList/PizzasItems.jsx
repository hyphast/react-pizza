import React from 'react'
import PizzaBlockSkeleton from '../PizzaBlock/PizzaBlockSkeleton'
import PizzaBlock from '../PizzaBlock/PizzaBlock'

const PizzasItems = ({ status, pizzaData }) => {
  const isDataLoading = status === 'loading'

  if (status === 'error') {
    return (
      <div className="content__error">
        <h2>
          Произошла ошибка <span>😕</span>
        </h2>
        <p>Попробуйте снова. Неизвестная ошибка.</p>
      </div>
    )
  }

  if (!pizzaData.length && !isDataLoading) {
    return (
      <div className="empty">
        <svg className="empty__logo" viewBox="0 0 1701 1701">
          <g id="empty_inbox">
            <path d="M1701,162.902C1701,72.934,1628.066,0,1538.098,0H162.902C72.934,0,0,72.934,0,162.902v1375.195   C0,1628.066,72.934,1701,162.902,1701h1375.195c89.969,0,162.902-72.934,162.902-162.902V162.902z M164.832,132h1375.517   c16.963,0,28.651,11.502,28.651,28.465V935h-398.719c-36.494,0-66.07,28.313-66.07,64.801   c0,143.903-117.076,260.348-260.979,260.348c-140.287,0-255.075-111.57-260.76-250.487c0.581-3.517,0.881-6.02,0.881-9.7   c0-36.49-29.581-64.961-66.071-64.961H132V160.465C132,143.502,147.87,132,164.832,132z M1540.349,1569H164.832   c-16.962,0-32.832-16.057-32.832-33.02V1067h323.663c31.503,185,193.305,327.05,387.568,327.05   c194.26,0,356.063-142.05,387.565-327.05H1569v468.98C1569,1552.943,1557.312,1569,1540.349,1569z" />
          </g>
          <g id="Layer_1" />
        </svg>
        <p className="empty__title">ПУСТО</p>
      </div>
    )
  }

  return (
    <div className="content__items">
      {isDataLoading
        ? [...new Array(4)].map((_, i) => <PizzaBlockSkeleton key={i} />) // eslint-disable-line react/no-array-index-key
        : pizzaData.map((data) => <PizzaBlock key={data.id} {...data} />)}
    </div>
  )
}

export default PizzasItems
