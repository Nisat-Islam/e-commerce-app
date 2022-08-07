import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdShoppingBasket } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { BsCartCheckFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { cartUpdateActions } from '../../store/cartUpdateSlice';
import { useInView } from 'react-intersection-observer';
import { categoryData } from '../../utils/dataProvider';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import PageLoading from '../../utils/PageLoading';

const ItemSection = (props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '100px 0px',
  });
  const [foods, setFoods] = useState('');
  const [filter, setFilter] = useState('fruit');

  const dispatch = useDispatch();

  const addItemToCart = (id, title, price, imageURL) => {
    dispatch(cartUpdateActions.addItemToCart({ id, title, price, imageURL }));
  };

  const itemsId = useSelector((state) => state.cartUpdate.itemsId);

  useEffect(() => {
    let ref;
    if (props.featured) {
      ref = query(
        collection(db, 'foods'),
        limit(5),
        orderBy('title', 'desc'),
        where('category', '==', filter)
      );
    } else {
      ref = query(
        collection(db, 'foods'),
        limit(8),
        where(props.searchType, '==', props.itemType)
      );
    }

    const fetcher = async () => {
      const unsub = await onSnapshot(ref, (snapshot) => {
        const foodItems = [];
        snapshot.docs.forEach((doc) =>
          foodItems.push({
            ...doc.data(),
            id: doc.id,
          })
        );

        setFoods(foodItems);
      });
      return () => unsub();
    };
    fetcher();
  }, [filter, props.featured, props.itemType, props.searchType]);
  const navigate = useNavigate();
  return (
    <>
      <div
        id="popular"
        className={`${
          props.featured && 'pt-20'
        } mt-10 flex items-center justify-between`}
      >
        <p className="rounded-t-full rounded-l-full bg-slate-900 p-2 text-xl font-bold text-orange-500 shadow-lg shadow-gray-900 ring-4 ring-orange-300 xsm:p-4 semism:text-2xl">
          {props.sectionHeading}
        </p>
        {!props.featured && (
          <p
            onClick={() => navigate(`category/${props.category}`)}
            className="cursor-pointer rounded-r-full rounded-tl-md bg-slate-900 p-2 text-lg font-bold text-orange-500 shadow-lg shadow-gray-900  ring-4 ring-orange-300 hover:text-green-400 2xsm:p-4 semism:text-xl"
          >
            View All
          </p>
        )}
      </div>
      {props.featured && (
        <div
          className="my-8 mt-9 flex h-full 
         w-full items-center gap-2 overflow-x-scroll p-5
        pb-5 scrollbar overflow-y-hidden  
        scrollbar-thumb-red-600 scrollbar-track-orange-400 sm:justify-center sm:scrollbar-none md:mb-0"
        >
          {categoryData?.map((food) => (
            <motion.div
              key={food.id}
              whileTap={{ scale: 0.75 }}
              className={` group flex h-28 w-24 min-w-[94px] flex-col items-center justify-center hover:h-28 hover:bg-red-600 mb-6 ${
                filter === food.urlParamName
                  ? 'border-[3px] border-orange-300 bg-gradient-to-tr from-orange-400 to-orange-500 shadow-md shadow-orange-300'
                  : 'ring- cursor-pointer bg-gradient-to-tr from-orange-200 to-orange-300 hover:shadow-md hover:shadow-orange-400'
              }  rounded-lg `}
              onClick={() => setFilter(food.urlParamName)}
            >
              <div
                className={`h-[70px] w-[70px] rounded-full ${
                  filter === food.urlParamName ? 'bg-white' : 'bg-slate-200'
                } flex items-center justify-center text-3xl text-white group-hover:bg-white`}
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
                className={`mt-2 text-sm font-semibold  capitalize group-hover:text-black ${
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
        ref={ref}
        className={` bg-gradient my-12 flex overflow-x-scroll rounded-md from-orange-100  to-orange-200 transition-all duration-150 ease-in-out scrollbar scrollbar-track-orange-300 
     scrollbar-thumb-orange-700 `}
      >
        {foods && foods.length > 0 ? (
          foods.map((item) => (
            <div
              key={item.id}
              className={`backdrop-lg m-2 my-8 mb-12 flex h-full w-full flex-col items-center justify-center rounded-lg rounded-tl-3xl rounded-br-3xl border-2 bg-gradient-to-r from-orange-300 to-orange-200 p-2 shadow-white backdrop-blur-lg hover:shadow-xl hover:drop-shadow-md hover:transition-all hover:duration-100 hover:ease-in-out md:flex-row md:justify-evenly ${
                props.featured ? 'border-orange-400' : 'border-slate-700'
              }`}
            >
              <div className="flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ ease: 'easeInOut' }}
                  className="h-36 w-36"
                >
                  {inView && (
                    <img
                      src={item.imageURL}
                      alt={item.title}
                      className="h-full w-full object-contain mix-blend-normal brightness-105 drop-shadow-xl"
                    />
                  )}
                </motion.div>
              </div>

              <div className="flex h-full w-full flex-col items-center justify-center md:pr-2">
                <div className="flex flex-col items-center md:items-end">
                  <p className="whitespace-nowrap font-semibold tracking-wide text-gray-800">
                    {item.title}
                  </p>
                  <p className=" flex items-center justify-center gap-1 text-black">
                    Rating:
                    <span className="flex items-center rounded-full bg-slate-800 px-1 text-yellow-500 ">
                      {item.rating} <AiFillStar className="text-base" />
                    </span>
                  </p>
                  <p className="font-bold  tracking-wide first-letter:text-2xl first-letter:text-green-600">
                    $ {item.price} {props.itemWeight}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="mx-3 mt-2 flex w-[150px] items-center 
                  justify-center
                  gap-2 rounded-tl-full rounded-br-full border border-red-500 bg-slate-800 py-1 hover:shadow-md hover:shadow-orange-500"
                  onClick={() => {
                    addItemToCart(
                      item.id,
                      item.title,
                      item.price,
                      item.imageURL
                    );
                  }}
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
          <div className="flex w-full items-center justify-center gap-4">
            <h1>Food's are getting cooked </h1>
            <PageLoading />
          </div>
        )}
      </div>
    </>
  );
};

export default ItemSection;
