import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { calculateTotals, getCartItems } from './store/features/cart/cartSLice'
import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'
import Modal from './components/Modal'

function App() {
  const dispatch = useDispatch()
  const { cartItems, isLoading } = useSelector((state) => state.cart)
  const { isOpen } = useSelector((state) => state.modal)

  useEffect(() => {
    dispatch(calculateTotals(cartItems))
  }, [cartItems, dispatch])

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
