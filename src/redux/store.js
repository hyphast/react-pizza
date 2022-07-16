import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice/filterSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
})
