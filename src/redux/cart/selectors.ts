import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

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
