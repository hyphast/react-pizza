import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './components'
import PizzasList from './pages/PizzasList'
import './scss/app.scss'
import { WithLazyComponent } from './hoc/withSuspense'

const LazyCart = WithLazyComponent(
  React.lazy(() => import(/* webpackChunkName="Cart" */ './pages/Cart'))
)
const LazyNotFound = WithLazyComponent(
  React.lazy(() => import(/* webpackChunkName="NotFound" */ './pages/NotFound'))
)
const LazyFullPizza = WithLazyComponent(
  React.lazy(
    () => import(/* webpackChunkName="FullPizza" */ './pages/FullPizza')
  )
)

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PizzasList />} />
        <Route path="/pizza/:id" element={<LazyFullPizza />} />
        <Route path="/cart" element={<LazyCart />} />
        <Route path="*" element={<LazyNotFound />} />
      </Route>
    </Routes>
  )
}

export default App
