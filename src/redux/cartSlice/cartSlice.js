import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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
    minusItem(state, action) {
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
    deleteItem(state, action) {
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

export const selectCart = (state) => state.cart
export const selectPizzaCount = createSelector(
  [selectCart, (_, id) => id],
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
