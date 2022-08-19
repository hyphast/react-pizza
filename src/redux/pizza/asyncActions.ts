import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SearchPizzaParams, TPizzaItem } from './types'

export const fetchPizzas = createAsyncThunk<TPizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzas',
  async (params) => {
    const { currentPage, pageSize, catFilter, sortProperty, order, search } =
      params
    const { data } = await axios.get<TPizzaItem[]>(
      `${process.env.REACT_APP_API_URL}?_page=${currentPage}&_limit=${pageSize}${catFilter}&_sort=${sortProperty}&_order=${order}${search}`
    )
    return data
  }
)
