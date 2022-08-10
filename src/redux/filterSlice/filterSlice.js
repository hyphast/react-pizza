import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  pageSize: 4,
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
    setCurrentPage(state, action) {
      state.currentPage = Number(action.payload)
    },
    setPageSize(state, action) {
      state.pageSize = Number(action.payload)
    },
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
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage)
      state.pageSize = Number(action.payload.pageSize)
      state.category = Number(action.payload.category)
      state.sort = {
        ...action.payload.sort,
      }
    },
  },
})

export const {
  setCurrentPage,
  setPageSize,
  setCategory,
  setSort,
  toggleSortOrder,
  setFilters,
} = filterSlice.actions

export default filterSlice.reducer
