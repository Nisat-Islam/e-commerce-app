import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import CartContainer from './component/CartContainer/CartContainer';
import Header from './component/Header/Header';
import CreateItem from './Pages/CreateItem/CreateItem';
import Home from './Pages/Home/Home';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import { useContext } from 'react';

import { AuthContext } from './Context/AuthContext';

import CheckOut from './Pages/CheckOut/CheckOut';

import Orders from './Pages/Orders/Orders';
import OrderComplete from './Pages/OrderComplete/OrderComplete';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import PageLoading from './utils/PageLoading';
import Footer from './component/Footer/Footer';

import SearchPage from './Pages/SearchPage/SearchPage';

function App() {
  const { authIsReady, user } = useContext(AuthContext);
  const orders = useSelector((state) => state.order.order);
  const items = useSelector((state) => state.cartUpdate.items);
  const cartOpen = useSelector((state) => state.cartOpen.cartOpen);

  return (
    authIsReady && (
      <div className="App flex flex-col w-full h-auto bg-gradient-to-tr from-orange-100 to-orange-200">
        <Header />
        <PageLoading />
        {cartOpen && <CartContainer />}
        <div>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/createItem" element={<CreateItem />} />
            <Route
              path="/signUp"
              element={user ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/checkout"
              element={
                !user || (items?.length === 0 && orders?.length === 0) ? (
                  <Navigate to="/" />
                ) : (
                  <CheckOut />
                )
              }
            />
            <Route
              path="/orders"
              element={!user ? <Navigate to="/" /> : <Orders />}
            />
            <Route
              path="/orderComplete"
              element={!user ? <Navigate to="/" /> : <OrderComplete />}
            />{' '}
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/search/:searchName" element={<SearchPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    )
  );
}

export default App;
