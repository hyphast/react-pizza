import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getItemsFromLS } from '../../utils/getItemsFromLS'
import { TCartItem } from './types'

type TCartUniqueItem = Pick<TCartItem, 'id' | 'type' | 'size'>

interface ICartSliceState {
  items: TCartItem[]
  totalPrice: number
}

const { items, totalPrice } = getItemsFromLS()
const initialState: ICartSliceState = {
  items,
  totalPrice,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (findItem) {
        findItem.count += 1
      } else {
        state.items = [...state.items, { ...action.payload, count: 1 }]
      }

      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<TCartUniqueItem>) {
      const pizza = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (pizza) {
        pizza.count -= 1
      }

      state.totalPrice = calcTotalPrice(state.items)
    },
    deleteItem(state, action: PayloadAction<TCartUniqueItem>) {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.type !== action.payload.type ||
          item.size !== action.payload.size
      )

      state.totalPrice = calcTotalPrice(state.items)
    },
    clearCart(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const selectCart = (state: RootState) => state.cart
export const selectPizzaCount = createSelector(
  [selectCart, (_: RootState, id: number) => id],
  (cart, id) =>
    cart.items.reduce((acc, item) => {
      if (item.id === id) {
        return acc + item.count
      }
      return acc
    }, 0)
)

export const { addItem, minusItem, deleteItem, clearCart } = cartSlice.actions

export default cartSlice.reducer
