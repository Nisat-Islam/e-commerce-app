import { motion } from 'framer-motion';

import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import { cartOpenActions } from '../../store/cartOpenSlice';
import { AuthContext } from '../../Context/AuthContext';

import { useNavigate } from 'react-router-dom';
import { cartUpdateActions } from '../../store/cartUpdateSlice';
import emptycart from '../../img/emptycart.png';
import { useState } from 'react';
import { BiMinus } from 'react-icons/bi';

const CartContainer = () => {
  const [discount, setDiscount] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cartUpdate.items);

  const { user } = useContext(AuthContext);
  const totalProductPrice = useSelector(
    (state) => state.cartUpdate.totalProductPrice
  );
  useEffect(() => {
    if (totalProductPrice >= 20) {
      setDiscount(5);
    } else {
      setDiscount(0);
    }
  }, [totalProductPrice]);
  let subTotal = totalProductPrice + 2.5 - discount;

  const loginHandler = () => {
    dispatch(cartOpenActions.toggleCart());
    user ? navigate('/checkout') : navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 z-[101] flex h-screen w-full flex-col bg-gradient-to-bl from-orange-300 to-orange-400 p-4 md:w-375"
    >
      <div className="flex items-center justify-between">
        <div className="cursor-pointer text-4xl">
          <p
            className="flex cursor-pointer items-center justify-center gap-2 
            rounded-md bg-slate-900 p-1 text-lg font-semibold tracking-wider text-orange-400 transition-all duration-150 ease-in-out hover:text-white hover:shadow-md"
            onClick={() => dispatch(cartOpenActions.toggleCart())}
          >
            Close
          </p>
        </div>
        {items.length > 0 && (
          <>
            <motion.p
              whileTap={{ scale: 0.75 }}
              className="flex cursor-pointer items-center justify-center 
          gap-2 rounded-md bg-slate-900 p-1 font-semibold tracking-wider text-orange-400 transition-all duration-150 ease-in-out hover:text-white hover:shadow-md"
              onClick={() => dispatch(cartUpdateActions.clearCart())}
            >
              Clear
            </motion.p>
          </>
        )}
      </div>
      {/* bottom section */}
      {items.length > 0 ? (
        <div className="mt-4 h-full w-full rounded-t-3xl bg-gradient-to-tr from-orange-300 to-orange-400 shadow-md shadow-gray-900">
          <div className="mb-2 sm:h-[300px] h-[250px] w-full overflow-y-scroll rounded-md p-3">
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  imageURL={item.img}
                  quantity={item.quantity}
                />
              ))}
          </div>

          {/* Cart Total Section */}
          <div className="flex  w-full flex-col border-0 text-white">
            <div
              className="flex h-full w-full flex-col gap-3 rounded-tr-full 
              rounded-br-full bg-gradient-to-t from-gray-800 to-gray-900 
            p-4 sm:px-24 px-10 sm:font-semibold 
            text-white shadow-sm shadow-gray-700 
            md:px-16"
            >
              <div className="flex items-center justify-between">
                <p>Total Product Price</p>
                <p className="first-letter:text-xl first-letter:text-green-600">
                  $ {totalProductPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Delivery Charge</p>
                <p className="first-letter:text-xl first-letter:text-green-600">
                  $ 2.5
                </p>
              </div>{' '}
              <div className="flex flex-col">
                <div className="w-full flex justify-between">
                  <p>
                    Discount{' '}
                    {discount >= 5 && (
                      <span className="capitalize text-sm tracking-wider text-orange-300 ">
                        (on order of $20+)
                      </span>
                    )}
                  </p>
                  <p className=" flex items-center gap-1">
                    <BiMinus className="text-green-400 text-xl" /> {discount}
                  </p>
                </div>
              </div>
              <div className="h-[1px] w-full bg-gray-500" />
              <div className="mt-2 flex items-start justify-between text-lg font-semibold text-white">
                <p>Total</p>
                <p className="first-letter:text-xl first-letter:text-green-600">
                  $ {subTotal.toFixed(2)}
                </p>
              </div>
            </div>

            <motion.div
              whileTap={{ scale: 0.74 }}
              className="mx-9 mt-2 mb-4 flex cursor-pointer items-center justify-center rounded-tl-3xl rounded-br-3xl bg-gradient-to-t from-slate-700 to-slate-900 p-2 text-orange-500 shadow-md shadow-orange-500 transition-all duration-150 ease-in-out hover:text-green-500"
              onClick={loginHandler}
            >
              {user ? (
                <p className="py-[2px] font-semibold "> Proceed To Check Out</p>
              ) : (
                <p className="font-semibold">Please Login/SignUp First</p>
              )}
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full rounded-tl-full  bg-gradient-to-r from-orange-300 to-orange-400 p-10">
          <h1 className="mt-12 text-center text-xl font-semibold text-slate-800">
            Cart Is Empty
          </h1>
          <img src={emptycart} alt="emptycart" className="h-full w-full" />
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
