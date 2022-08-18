export enum SortEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}
export enum SortNameEnum {
  RATING = 'популярности',
  PRICE = 'цене',
  TITLE = 'алфавиту',
}
export type TSortType = {
  name: SortNameEnum
  sortProperty: SortEnum
  isDesc?: boolean
}
export interface IFilterSliceState {
  searchValue: string
  currentPage: number
  pageSize: number
  category: number
  sort: TSortType
}
