import React, {useEffect, useState} from 'react';
import Categories from './Categories';
import PizzaBlockSkeleton from './PizzaBlock/PizzaBlockSkeleton';
import PizzaBlock from './PizzaBlock/PizzaBlock';
import TopSort from './TopSort';

const PizzasList = () => {
  const [pizzaData, setPizzaData] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedSort, setSelectedSort] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  })
  const [isDesc, setIsDesc] = useState(false)

  useEffect(() => {
    setIsDataLoading(true)
    const catFilter = selectedCategory === 0 ? '' : `category=${ selectedCategory }`
    const curSort = selectedSort.sortProperty
    const order = isDesc ? 'desc' : 'asc'
    fetch(`https://62ac65d69fa81d00a7b0fb83.mockapi.io/api/pizzas?${ catFilter }&sortBy=${ curSort }&order=${ order }`)
      .then((res => {
        return res.json()
      }))
      .then((data => {
        setPizzaData(data)
        setIsDataLoading(false)
        // console.log(data)
      }))
      .finally(() => {
        setIsDataLoading(false)
      })
  }, [selectedCategory, selectedSort, isDesc])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <TopSort
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            isDesc={isDesc}
            setIsDesc={setIsDesc}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isDataLoading
            ?
            [...new Array(8)].map((_, i) => <PizzaBlockSkeleton key={ i } />)
            :
            pizzaData.map(data => (
              <PizzaBlock key={ data.id } { ...data }/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PizzasList;
