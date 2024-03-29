import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import { setFilters } from '../redux/filter/slice'
import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/filter/selectors'
import { SortEnum, TSortType } from '../redux/filter/types'
import { selectPizzaData } from '../redux/pizza/selectors'
import { fetchPizzas } from '../redux/pizza/asyncActions'
import { sortList } from '../components/MainBar/TopSort'
import { Categories, TopSort, Pagination, PizzasItems } from '../components'

type TSearch = {
  category: string
  sort: string
  order: string
  page: string
  pageSize: string
}

const PizzasList: React.FC = () => {
  const dispatch = useAppDispatch()
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
  // const isSearch = useRef(false)

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

  // ##################### VERSION 1 ############################

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify(
  //       {
  //         category: selectedCategory,
  //         sort: sortProperty,
  //         order: isDesc,
  //         page: currentPage,
  //         pageSize,
  //       },
  //       { skipNulls: true }
  //     )
  //     navigate(`?${queryString}`)
  //   }
  //   isMounted.current = true
  // }, [selectedCategory, sortProperty, isDesc, currentPage, pageSize])

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.slice(1)) as TSearch
  //
  //     const { page, order, ...rest } = params
  //
  //     const currentSort = sortList.find(
  //       (item) => item.sortProperty === params.sort
  //     )
  //
  //     const sortWithDesc = {
  //       ...currentSort,
  //       isDesc: order === 'true',
  //     } as TSortType
  //
  //     dispatch(
  //       setFilters({
  //         searchValue: '',
  //         currentPage: Number(page),
  //         pageSize: Number(rest.pageSize),
  //         category: Number(rest.category),
  //         sort: sortWithDesc || sortList[0],
  //       })
  //     )
  //     isSearch.current = true
  //   }
  // }, [])
  //
  // useEffect(() => {
  //   if (!isSearch.current || (isSearch.current && selectedCategory === 0)) {
  //     getPizzas()
  //   }
  //
  //   isSearch.current = false
  // }, [
  //   selectedCategory,
  //   sortProperty,
  //   isDesc,
  //   searchValue,
  //   currentPage,
  //   pageSize,
  // ])

  // ##################### VERSION 2 ############################

  useEffect(() => {
    if (isMounted.current) {
      getPizzas()
      const queryString = qs.stringify(
        {
          category: selectedCategory,
          sort: sortProperty,
          order: isDesc,
          page: currentPage,
          pageSize,
        },
        { skipNulls: true }
      )
      navigate(`?${queryString}`)
    } else if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1)) as TSearch

      const { page, order, ...rest } = params

      const currentSort = sortList.find(
        (item) => item.sortProperty === params.sort
      )

      const sortWithDesc = {
        ...currentSort,
        isDesc: order === 'true',
      } as TSortType

      dispatch(
        setFilters({
          searchValue: '',
          currentPage: Number(page),
          pageSize: Number(rest.pageSize),
          category: Number(rest.category),
          sort: sortWithDesc || sortList[0],
        })
      )
      if (
        Number(rest.category) === 0 &&
        rest.sort === SortEnum.RATING &&
        order === 'false' &&
        Number(page) === 1 &&
        Number(rest.pageSize) === 4
      ) {
        getPizzas()
      }
    } else {
      getPizzas()
    }
    isMounted.current = true
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
