import { RootState } from '../store'

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort
export const selectSearchValue = (state: RootState) => state.filter.searchValue
