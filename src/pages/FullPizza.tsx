import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { PizzaBlock, Loading } from '../components'
import { TPizzaItem } from '../redux/pizza/types'

const FullPizza: React.FC = () => {
  const { id } = useParams()
  const [pizzaData, setPizzaData] = useState<TPizzaItem>()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get<TPizzaItem>(
          `${process.env.REACT_APP_API_URL}/${id}`
        )
        setPizzaData(data)
      } catch (e) {
        alert(e)
      }
    }

    fetchPizza()
  }, [])

  if (!pizzaData) {
    return <Loading />
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
