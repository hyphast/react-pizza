import { TCartItem } from '../redux/cart/types'

export const calcTotalPrice = (items: TCartItem[]): number => {
  return items.reduce((acc: number, item) => acc + item.price * item.count, 0)
}
