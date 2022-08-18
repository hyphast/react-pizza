import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../redux/cart/slice'
import { RootState } from '../../redux/store'
import { selectPizzaCount } from '../../redux/cart/selectors'
import { TPizzaItem } from '../../redux/pizza/types'

const PizzaBlock: React.FC<TPizzaItem> = ({
  id,
  title,
  imageUrl,
  price,
  sizes,
  types,
}) => {
  const dispatch = useDispatch()
  const count = useSelector((state: RootState) => selectPizzaCount(state, id))
  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedType, setSelectedType] = useState(types[0])

  const pizzaType: string[] = ['тонкое', 'традиционное']

  const onClickAdd = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
    dispatch(
      addItem({
        id,
        title,
        imageUrl,
        price,
        type: pizzaType[selectedType],
        size: sizes[selectedSize],
        count: 0,
      })
    )
  }

  const onClickSize = (
    e: React.MouseEvent<HTMLLIElement>,
    size: number
  ): void => {
    e.preventDefault()
    setSelectedSize(size)
  }
  const onClickType = (
    e: React.MouseEvent<HTMLLIElement>,
    type: number
  ): void => {
    e.preventDefault()
    setSelectedType(type)
  }

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              key={type}
              className={selectedType === type ? 'active' : ''}
              onClick={(e) => onClickType(e, type)}
            >
              {pizzaType[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={size}
              className={selectedSize === index ? 'active' : ''}
              onClick={(e) => onClickSize(e, index)}
            >
              {size}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
          onClick={onClickAdd}
          tabIndex={id}
          role="button"
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {count ? <i>{count}</i> : ''}
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
