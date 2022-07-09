import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdShoppingBasket } from 'react-icons/md';
import { BsCartCheckFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { cartUpdateActions } from '../../store/cartUpdateSlice';
import { useNavigate } from 'react-router-dom';
import PageLoading from '../../utils/PageLoading';

import { useState } from 'react';
import { categoryData } from '../../utils/dataProvider';

const AllProducts = (props) => {
  const [filter, setFilter] = useState(props.param);
  const [cooking, setCooking] = useState(false);
  const itemsId = useSelector((state) => state.cartUpdate.itemsId);
  const navigate = useNavigate();
  const paramSetter = (paramName) => {
    setFilter(paramName);
    navigate(`/category/${paramName}`);
  };
  const dispatch = useDispatch();
  const addItemToCart = (id, title, price, imageURL) => {
    dispatch(cartUpdateActions.addItemToCart({ id, title, price, imageURL }));
  };
  const timeOut = () => {
    setCooking(true);
    setTimeout(() => {
      setCooking(false);
    }, 3000);
  };
  useEffect(() => {
    timeOut();
  }, [props.param]);
  return (
    <div className="md:px-10 semism:px-5 2xsm:px-2">
      <div className="capitalize flex flex-col items-center justify-center pt-16">
        <div className="bg-gradient-to-t from-orange-500 to-orange-600 rounded-tr-full rounded-bl-full shadow-xl border-red-500 border-2 ">
          <div className="flex flex-col gap-2 bg-gradient-to-t from-slate-800 to-slate-900 p-5 rounded-tl-full rounded-br-full shadow-orange-400 shadow-md">
            {props.category ? (
              <p className="text-2xl font-bold text-orange-300 text-b">
                Our {props.param} Items
              </p>
            ) : (
              <p className="text-2xl font-bold text-orange-300 text-b">
                You Searched for : {props.param}
              </p>
            )}
          </div>
        </div>
      </div>
      {props.category && (
        <div
          className="w-full h-full flex items-center 
         sm:justify-center mt-9 gap-2 overflow-x-scroll sm:scrollbar-none
        scrollbar overflow-y-hidden scrollbar-thumb-red-600  
        scrollbar-track-orange-400 my-8 p-5 md:mb-0 pb-14"
        >
          {categoryData?.map((food) => (
            <motion.div
              key={food.id}
              whileTap={{ scale: 0.75 }}
              className={` group flex flex-col items-center justify-center hover:bg-red-600 w-24 h-28 min-w-[94px] hover:h-28  ${
                filter === food.urlParamName
                  ? 'bg-gradient-to-tr from-orange-400 to-orange-500 shadow-md shadow-orange-300 border-[3px] border-orange-300'
                  : 'bg-gradient-to-tr from-orange-200 to-orange-300 hover:shadow-md hover:shadow-orange-400 cursor-pointer ring-'
              }  rounded-lg `}
              onClick={() => paramSetter(food.urlParamName)}
            >
              <div
                className={`w-[70px] h-[70px] rounded-full ${
                  filter === food.urlParamName ? 'bg-white' : 'bg-slate-200'
                } group-hover:bg-white flex items-center justify-center text-white text-3xl`}
              >
                <span
                  className={`group-hover:text-orange-700 ${
                    filter === food.urlParamName && 'text-orange-700'
                  }`}
                >
                  <img src={food.icon} alt="icon" />
                </span>
              </div>
              <p
                className={`capitalize text-sm group-hover:text-black  font-semibold mt-2 ${
                  filter === food.urlParamName ? 'text-white' : 'text-gray-900'
                }`}
              >
                {food.urlParamName}
              </p>
            </motion.div>
          ))}
        </div>
      )}
      <div
        className={`w-full h-full my-7 grid  sm:grid-cols-3  semism:grid-cols-2 grid-cols-1 bg-gradient from-orange-100 to-orange-200 transition-all duration-150 ease-in-out 
     rounded-md 2xl:flex 2xl:flex-wrap 2xl:w-auto 2xl:h-auto gap-4`}
      >
        {props.foods && props.foods.length > 0 ? (
          props.foods?.map((item) => (
            <div
              key={item.id}
              className=" h-full backdrop-lg flex flex-col xl:flex-row justify-evenly items-center 
              rounded-lg p-2  backdrop-blur-lg hover:drop-shadow-md hover:shadow-lg shadow-white  bg-gradient-to-r from-orange-300 to-orange-200 hover:transition-all hover:duration-100 hover:ease-in-out mb-12 rounded-tl-3xl rounded-br-3xl border-2 border-slate-700"
            >
              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ ease: 'easeInOut' }}
                  className="w-36 h-36 flex items-center justify-center"
                >
                  <img
                    src={item.imageURL}
                    alt={item.title}
                    className="w-full h-full object-contain drop-shadow-xl brightness-105 mix-blend-normal"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col text-center  md:items-center md:justify-center">
                <div className="flex flex-col lg:items-end">
                  <p className="font-semibold text-gray-800 tracking-wide">
                    {item.title}
                  </p>
                  <p className=" text-black flex items-center justify-center gap-1">
                    Rating:
                    <span className="flex items-center bg-slate-800 px-1 rounded-full text-yellow-500 ">
                      {item.rating} <AiFillStar className="text-base" />
                    </span>
                  </p>
                  <p className="font-bold  first-letter:text-2xl first-letter:text-green-600 tracking-wide">
                    $ {item.price} {props.itemWeight}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="mt-2 w-[150px] mx-3 border border-red-500 
                  bg-slate-800
                  flex items-center justify-center py-1 hover:shadow-md hover:shadow-orange-500 gap-2 rounded-tl-full rounded-br-full"
                  onClick={() =>
                    addItemToCart(
                      item.id,
                      item.title,
                      item.price,
                      item.imageURL
                    )
                  }
                >
                  {!itemsId?.includes(item.id) ? (
                    <>
                      <div
                        className={`flex h-8 w-8 items-center justify-center ${'bg-orange-400'} cursor-pointer rounded-full text-2xl text-white `}
                      >
                        <MdShoppingBasket />
                      </div>
                      <p className="text-white">Add To Cart</p>
                    </>
                  ) : (
                    <>
                      <div
                        className={`flex h-8 w-8 items-center justify-center bg-green-600 cursor-pointer rounded-full text-2xl text-white `}
                      >
                        <BsCartCheckFill />
                      </div>
                      <p className="text-green-400">Add More</p>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center gap-4">
            {cooking || props.queryField === 'category' ? (
              <>
                <h1>Food's are getting cooked </h1>
                <PageLoading />
              </>
            ) : (
              <h1>Sorry No Items Matched Your Search</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
