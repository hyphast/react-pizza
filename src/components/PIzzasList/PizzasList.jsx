import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import Categories from '../Categories'
import TopSort, { sortList } from '../TopSort'
import Pagination from '../Pagination/Pagination'
import PizzasItems from './PizzasItems'
import { SearchContext } from '../../SearchContextWrapper'
import { setFilters } from '../../redux/filterSlice/filterSlice'

const PizzasList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    category: selectedCategory,
    sort,
    currentPage,
    pageSize,
  } = useSelector((state) => state.filter)
  const { sortProperty, name: sortName, isDesc } = sort
  const { searchValue } = useContext(SearchContext)
  const [pizzaData, setPizzaData] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(false)
  const isMounted = useRef(false)
  const isSearch = useRef(false)

  const fetchPizzas = () => {
    setIsDataLoading(true)
    const catFilter =
      selectedCategory === 0 ? '' : `&category=${selectedCategory}`
    const search = searchValue ? `&title_like=${searchValue}` : ''
    const order = isDesc ? 'desc' : 'asc'
    axios
      .get(
        `http://localhost:3002/pizzas?_page=${currentPage}&_limit=${pageSize}${catFilter}&_sort=${sortProperty}&_order=${order}${search}`
      )
      .then((res) => {
        setPizzaData(res.data)
        setIsDataLoading(false)
      })
      .finally(() => {
        setIsDataLoading(false)
      })
  }

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: selectedCategory,
        sort: sortProperty,
        order: isDesc,
        page: currentPage,
        pageSize,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [selectedCategory, sortProperty, isDesc, currentPage, pageSize])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1))

      const { page, order, ...rest } = params

      const currentSort = sortList.find(
        (item) => item.sortProperty === params.sort
      )
      currentSort.isDesc = order === 'true'

      dispatch(setFilters({ ...rest, currentPage: page, sort: currentSort }))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas()
    }

    isSearch.current = false
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
          pageSize={pageSize}
        />
      </div>
    </div>
  )
}

export default PizzasList
