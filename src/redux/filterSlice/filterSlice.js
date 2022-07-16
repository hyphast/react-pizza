import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
    isDesc: false,
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload
    },
    setSort(state, action) {
      state.sort = {
        ...state.sort,
        ...action.payload,
      }
    },
    toggleSortOrder(state, action) {
      state.sort.isDesc = action.payload
    },
  },
})

export const { setCategory, setSort, toggleSortOrder } = filterSlice.actions

export default filterSlice.reducer
