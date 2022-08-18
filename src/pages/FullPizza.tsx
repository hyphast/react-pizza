import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import { TPizzaItem } from '../redux/pizza/types'

const FullPizza: React.FC = () => {
  const { id } = useParams()
  const [pizzaData, setPizzaData] = useState<TPizzaItem>()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get<TPizzaItem>(
          `http://localhost:3002/pizzas/${id}`
        )
        setPizzaData(data)
      } catch (e) {
        alert(e)
      }
    }

    fetchPizza()
  }, [])

  if (!pizzaData) {
    return (
      <h2 style={{ textAlign: 'center', padding: '120px 0' }}>Загрузка...</h2>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '25px 0',
      }}
    >
      <PizzaBlock {...pizzaData} />
      <Link
        style={{ marginTop: '35px' }}
        to="/"
        className="button button--black"
      >
        <span>Вернуться назад</span>
      </Link>
    </div>
  )
}

export default FullPizza
