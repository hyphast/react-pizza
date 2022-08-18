import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SearchPizzaParams, TPizzaItem } from './types'

export const fetchPizzas = createAsyncThunk<TPizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzas',
  async (params) => {
    const { currentPage, pageSize, catFilter, sortProperty, order, search } =
      params
    const { data } = await axios.get<TPizzaItem[]>(
      `http://localhost:3002/pizzas?_page=${currentPage}&_limit=${pageSize}${catFilter}&_sort=${sortProperty}&_order=${order}${search}`
    )
    return data
  }
)
