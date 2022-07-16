import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Categories from '../Categories'
import TopSort from '../TopSort'
import Pagination from '../Pagination/Pagination'
import PizzasItems from './PizzasItems'
import { SearchContext } from '../../SearchContextWrapper'

const PizzasList = () => {
  const { category: selectedCategory, sort } = useSelector(
    (state) => state.filter
  )
  const { sortProperty, name: sortName, isDesc } = sort
  const { searchValue } = useContext(SearchContext)
  const [pizzaData, setPizzaData] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(4)

  useEffect(() => {
    setIsDataLoading(true)
    const catFilter =
      selectedCategory === 0 ? '' : `&category=${selectedCategory}`
    const search = searchValue ? `&search=${searchValue}` : ''
    const curSort = sortProperty
    const order = isDesc ? 'desc' : 'asc'
    axios
      .get(
        `https://62ac65d69fa81d00a7b0fb83.mockapi.io/api/pizzas?page=${currentPage}&limit=${pageSize}${catFilter}&sortBy=${curSort}&order=${order}${search}`
      )
      .then((res) => {
        setPizzaData(res.data)
        setIsDataLoading(false)
      })
      .finally(() => {
        setIsDataLoading(false)
      })
  }, [
    selectedCategory,
    sortProperty,
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
          <Categories selectedCategory={selectedCategory} />
          <TopSort sortName={sortName} isDesc={isDesc} />
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
