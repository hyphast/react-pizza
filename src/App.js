import React, { useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import Main from './pages/Main'
import NotFound from './pages/NotFound'
import PizzasList from './components/PIzzasList/PizzasList'
import './scss/app.scss'
import SearchContextWrapper from './SearchContextWrapper'

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <SearchContextWrapper value={{ searchValue, setSearchValue }}>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<PizzasList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SearchContextWrapper>
  )
}

export default App
