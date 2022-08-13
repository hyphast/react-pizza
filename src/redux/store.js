import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice/filterSlice'
import cartReducer from './cartSlice/cartSlice'
import pizzaSlice from './pizzaSlice/pizzaSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaSlice,
  },
})
