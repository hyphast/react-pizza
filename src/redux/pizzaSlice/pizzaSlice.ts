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

export type SearchPizzaParams = {
  currentPage: number
  pageSize: number
  catFilter: string
  sortProperty: string
  order: string
  search: string
}
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

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface IPizzaSliceState {
  items: TPizzaItem[]
  status: Status
}
const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING,
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
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
