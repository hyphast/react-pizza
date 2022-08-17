import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export type TCartItem = {
  id: number
  title: string
  imageUrl: string
  type: string
  size: number
  price: number
  count: number
}
type TCartUniqueItem = Pick<TCartItem, 'id' | 'type' | 'size'>

interface ICartSliceState {
  items: TCartItem[]
  totalPrice: number
}
const initialState: ICartSliceState = {
  items: [],
  totalPrice: 0,
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

      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      )
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

      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      )
    },
    deleteItem(state, action: PayloadAction<TCartUniqueItem>) {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.type !== action.payload.type ||
          item.size !== action.payload.size
      )

      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      )
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
