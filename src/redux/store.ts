import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import filterReducer from './filter/slice'
import cartReducer from './cart/slice'
import pizzaSlice from './pizza/slice'

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
