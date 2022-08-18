export type TCartItem = {
  id: number
  title: string
  imageUrl: string
  type: string
  size: number
  price: number
  count: number
}

export type TCartUniqueItem = Pick<TCartItem, 'id' | 'type' | 'size'>

export interface ICartSliceState {
  items: TCartItem[]
  totalPrice: number
}
