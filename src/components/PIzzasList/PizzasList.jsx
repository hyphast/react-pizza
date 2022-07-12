import React, { useContext, useEffect, useState } from 'react'
import Categories from '../Categories'
import TopSort from '../TopSort'
import Pagination from '../Pagination/Pagination'
import PizzasItems from './PizzasItems'
import { SearchContext } from '../../SearchContextWrapper'

const PizzasList = () => {
  const { searchValue } = useContext(SearchContext)
  const [pizzaData, setPizzaData] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedSort, setSelectedSort] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  })
  const [isDesc, setIsDesc] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(4)

  useEffect(() => {
    setIsDataLoading(true)
    const catFilter =
      selectedCategory === 0 ? '' : `&category=${selectedCategory}`
    const search = searchValue ? `&search=${searchValue}` : ''
    const curSort = selectedSort.sortProperty
    const order = isDesc ? 'desc' : 'asc'
    fetch(
      `https://62ac65d69fa81d00a7b0fb83.mockapi.io/api/pizzas?page=${currentPage}&limit=${pageSize}${catFilter}&sortBy=${curSort}&order=${order}${search}`
    )
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPizzaData(data)
        setIsDataLoading(false)
        // console.log(data)
      })
      .finally(() => {
        setIsDataLoading(false)
      })
  }, [
    selectedCategory,
    selectedSort.sortProperty,
    isDesc,
    searchValue,
    currentPage,
    pageSize,
  ])

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
        <PizzasItems isDataLoading={isDataLoading} pizzaData={pizzaData} />
        <Pagination
          totalCount={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  )
}

export default PizzasList
