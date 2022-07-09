import React, { useContext } from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

import { cartUpdateActions } from '../../store/cartUpdateSlice';

import { AuthContext } from '../../Context/AuthContext';

const CartItem = (props) => {
  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();
  const addItemToCart = (id, title, price) => {
    dispatch(cartUpdateActions.addItemToCart({ id, title, price }));
  };
  const removeItemFromCart = (id) => {
    dispatch(cartUpdateActions.removeItemFromCart(id));
  };
  let price = props.price * props.quantity;
  price = +price;

  return (
    <div className="w-full flex justify-between items-center bg-gradient-to-tr from-gray-800 to-gray-900 sm:p-3 p-1  sm:gap-4 rounded-l-3xl  shadow-md shadow-slate-900">
      <div className="flex gap-3">
        <div className="sm:w-16 sm:h-16 w-12 h-12">
          <img
            src={props.imageURL}
            alt="product"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-white">{props.title}</p>
          <p className="text-white first-letter:text-green-400 first-letter:text-xl ">
            $ {price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:text-2xl text-xl justify-center items-center text-white sm:py-0 py-1">
        <div onClick={() => removeItemFromCart(props.id)}>
          <p className="cursor-pointer text-orange-400 sm:border border-orange-500">
            <BiMinus />
          </p>
        </div>
        <div className="text-orange-300 ">
          <p>{props.quantity}</p>
        </div>
        <div
          onClick={() =>
            addItemToCart(props.id, props.title, props.price, user)
          }
        >
          <p className="cursor-pointer text-orange-400 sm:border border-orange-500">
            <BiPlus />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
