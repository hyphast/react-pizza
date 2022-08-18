import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice, getItemsFromLS } from '../../utils'
import { ICartSliceState, TCartItem, TCartUniqueItem } from './types'

const initialState: ICartSliceState = getItemsFromLS()

const slice = createSlice({
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

export const { addItem, minusItem, deleteItem, clearCart } = slice.actions

export default slice.reducer
