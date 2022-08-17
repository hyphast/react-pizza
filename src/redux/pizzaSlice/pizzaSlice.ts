import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { RootState } from '../store'

export type TPizzaItem = {
  id: number
  title: string
  imageUrl: string
  price: number
  sizes: number[]
  types: number[]
}

export const fetchPizzas = createAsyncThunk<
  TPizzaItem[],
  Record<string, string | number>
>('pizza/fetchPizzas', async (params) => {
  const { currentPage, pageSize, catFilter, sortProperty, order, search } =
    params
  const { data } = await axios.get<TPizzaItem[]>(
    `http://localhost:3002/pizzas?_page=${currentPage}&_limit=${pageSize}${catFilter}&_sort=${sortProperty}&_order=${order}${search}`
  )
  return data
})

interface IPizzaSliceState {
  items: TPizzaItem[]
  status: 'loading' | 'success' | 'error'
}
const initialState: IPizzaSliceState = {
  items: [],
  status: 'loading', // loading | success | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizzaItem[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success'
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error'
      state.items = []
    })
  },
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
