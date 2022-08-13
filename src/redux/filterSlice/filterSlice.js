import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
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
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
  },
})

export const selectFilter = (state) => state.filter
export const selectSort = (state) => state.filter.sort
export const selectSearchValue = (state) => state.filter.searchValue

export const {
  setCurrentPage,
  setPageSize,
  setCategory,
  setSort,
  toggleSortOrder,
  setFilters,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
