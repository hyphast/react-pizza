import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
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

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
