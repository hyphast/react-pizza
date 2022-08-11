import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice/filterSlice'
import cartReducer from './cartSlice/cartSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
  },
})
