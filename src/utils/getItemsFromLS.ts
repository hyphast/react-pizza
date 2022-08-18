import { calcTotalPrice } from './calcTotalPrice'
import { TCartItem } from '../redux/cart/types'

export const getItemsFromLS = () => {
  const data = localStorage.getItem('cart')
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)

  return {
    items: items as TCartItem[],
    totalPrice,
  }
}
