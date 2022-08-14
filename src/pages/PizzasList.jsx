import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import Categories from '../components/Categories'
import TopSort, { sortList } from '../components/TopSort'
import Pagination from '../components/Pagination/Pagination'
import PizzasItems from '../components/PIzzasList/PizzasItems'
import { selectFilter, setFilters } from '../redux/filterSlice/filterSlice'
import { fetchPizzas, selectPizzaData } from '../redux/pizzaSlice/pizzaSlice'

const PizzasList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: pizzaData, status } = useSelector(selectPizzaData)
  const {
    category: selectedCategory,
    sort,
    currentPage,
    pageSize,
    searchValue,
  } = useSelector(selectFilter)
  const { sortProperty, name: sortName, isDesc } = sort
  const isMounted = useRef(false)
  const isSearch = useRef(false)

  const getPizzas = async () => {
    const catFilter =
      selectedCategory === 0 ? '' : `&category=${selectedCategory}`
    const search = searchValue ? `&title_like=${searchValue}` : ''
    const order = isDesc ? 'desc' : 'asc'

    dispatch(
      fetchPizzas({
        currentPage,
        pageSize,
        catFilter,
        sortProperty,
        order,
        search,
      })
    )
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
    if (!isSearch.current || (isSearch.current && selectedCategory === 0)) {
      getPizzas()
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
        <PizzasItems status={status} pizzaData={pizzaData} />
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
