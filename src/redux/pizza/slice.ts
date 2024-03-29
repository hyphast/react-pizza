import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPizzaSliceState, Status, TPizzaItem } from './types'
import { fetchPizzas } from './asyncActions'

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

const slice = createSlice({
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

export const { setItems } = slice.actions

export default slice.reducer
