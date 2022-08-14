import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import MainLayout from './components/layouts/MainLayout'
import NotFound from './pages/NotFound'
import PizzasList from './pages/PizzasList'
import FullPizza from './pages/FullPizza'
import './scss/app.scss'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PizzasList />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
