import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export type TSortType = {
  name: 'популярности' | 'цене' | 'алфавиту'
  sortProperty: 'rating' | 'price' | 'title'
  isDesc?: boolean
}
export interface IFilterSliceState {
  searchValue: string
  currentPage: number
  pageSize: number
  category: number
  sort: TSortType
}
const initialState: IFilterSliceState = {
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
    setCurrentPage(state, action: PayloadAction<string | number>) {
      state.currentPage = Number(action.payload)
    },
    setPageSize(state, action: PayloadAction<string>) {
      state.pageSize = Number(action.payload)
    },
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload
    },
    setSort(state, action: PayloadAction<TSortType>) {
      state.sort = {
        ...state.sort,
        ...action.payload,
      }
    },
    toggleSortOrder(state, action: PayloadAction<boolean>) {
      state.sort.isDesc = action.payload
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage)
      state.pageSize = Number(action.payload.pageSize)
      state.category = Number(action.payload.category)
      state.sort = {
        ...action.payload.sort,
      }
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
  },
})

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort
export const selectSearchValue = (state: RootState) => state.filter.searchValue

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
