import { TCartItem } from '../redux/cartSlice/types'

export const calcTotalPrice = (items: TCartItem[]): number => {
  return items.reduce((acc: number, item) => acc + item.price * item.count, 0)
}
