export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

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

export interface IPizzaSliceState {
  items: TPizzaItem[]
  status: Status
}
