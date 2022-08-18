import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilterSliceState, SortEnum, SortNameEnum, TSortType } from './types'

const initialState: IFilterSliceState = {
  searchValue: '',
  currentPage: 1,
  pageSize: 4,
  category: 0,
  sort: {
    name: SortNameEnum.RATING,
    sortProperty: SortEnum.RATING,
    isDesc: false,
  },
}

const slice = createSlice({
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

export const {
  setCurrentPage,
  setPageSize,
  setCategory,
  setSort,
  toggleSortOrder,
  setFilters,
  setSearchValue,
} = slice.actions

export default slice.reducer
