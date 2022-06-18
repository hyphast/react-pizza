import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Cart from './pages/Cart';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import PizzasList from './components/PizzasList';
import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />}>
        <Route index element={<PizzasList />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
