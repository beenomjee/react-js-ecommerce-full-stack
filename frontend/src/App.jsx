import { Route, Routes } from 'react-router-dom'
import { Account, AdminHome, AdminLayout, AdminOrders, AdminProductCreate, AdminProducts, Cart, Checkout, ErrorPage, Home, Orders, ProductPage, Products, SignIn, SignUp, SuccessPayment } from './modules'
import { AdminRoute, Layout, NotLoggedInRoute, ProtectedRoute } from './components'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'



const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location]);
  return (
    <div>
      <Routes>
        {/* not logged in route */}
        <Route element={<NotLoggedInRoute />}>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>

        {/* admin route */}
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminRoute />}>
            <Route path='' element={<AdminHome />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='products/create' element={<AdminProductCreate />} />
            <Route path='products/update/:id' element={<AdminProductCreate update />} />
            <Route path='orders' element={<AdminOrders />} />
          </Route>
        </Route>

        <Route element={<Layout />}>
          {/* open route */}
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/search' element={<Products search />} />
          <Route path='/cart' element={<Cart />} />

          {/* protectRoutes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/account' element={<Account />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/success-payment' element={<SuccessPayment />} />
          </Route>

          <Route path='*' element={<ErrorPage />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App