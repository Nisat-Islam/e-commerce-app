import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { categoryData } from '../../utils/dataProvider';
import { motion } from 'framer-motion';
const HeroSection = () => {
  return (
    <div
      className="w-full md:h-screen
      bg-gradient-to-r 
     from-slate-800 to-slate-900 
     sm:h-full
     rounded-b-md shadow-xl shadow-gray-900 "
    >
      <section
        className=" w-full h-full grid md:gap-3 gap-10 gap md:px-1 md:grid-cols-2
         bg-gradient-to-t from-orange-400 to-orange-300 
         rounded-br-full 
         rounded-tl-full pt-28 md:pb-0 pb-10"
        id="home"
      >
        <div className="relative sm:h-420 h-[360px] flex flex-1 items-center xsm:mx-5">
          <div
            className="absolute w-full h-full 
            bg-gradient-to-r from-slate-900
             to-slate-800 
             rounded-md
          shadow-2xl shadow-black ring-8
           ring-slate-900 ring-offset-orange-300 
           md:ring-offset-8 overflow-hidden 
           "
          >
            <div className="w-full h-full flex flex-col items-start sm:p-5 2xsm:p-2">
              <div className="flex gap-2 items-center justify-center bg-gradient-to-r from-orange-300 to-orange-400  rounded-full px-4 py-2 border-4 border-slate-800 ">
                <p className="font-bold text-lg text-slate-800 tracking-wide">
                  Fastest Delivery
                </p>

                <div>
                  <FaShippingFast className="xsm:w-7 h-7 rounded-full text-slate-800" />
                </div>
              </div>
              <p className="lg:text-[2.5rem] md:text-[2rem] sm:text-[2.8rem] semism:text-[2.2rem] 2xsm:text-[1.7rem] text-[1.5rem] font-extrabold px-2 md:px-1 text-orange-400 tracking-wide">
                Everything You Need, Delivered Directly To
                <span className="text-orange-500 lg:text-[3rem] md:text-[2.1rem] sm:text-[3rem] semism:text-[2.3rem] 2xsm:text-[2rem] text-[1.7rem]">
                  {' '}
                  Your Doorstep
                </span>
              </p>
              <a href="#popular">
                <button
                  type="button"
                  className="lg:w-auto 
                bg-gradient-to-tr from-slate-800 to-slate-900 
                hover:from-slate-900 hover:to-slate-800 
                group 
                rounded-lg w-full  py-3 px-3 lg:px-4 mt-4 ml-2 
                 text-orange-300
                 transition-all duration-150
                  ease-in-out border 
                  border-orange-300 shadow-sm 
                  shadow-orange-300 
                  hover:shadow-sm hover:shadow-orange-400
                  font-semibold 
                  tracking-wide "
                >
                  <p className="group-hover:text-orange-400">View Products</p>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="relative sm:h-420 h-340  flex flex-1 items-center mx-10 flex-nowrap">
          <div className="absolute w-full h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-tr-full rounded-bl-full shadow-2xl shadow-black ring-8 ring-slate-900 ring-offset-orange-300 ring-offset-8 overflow-hidden box-border" />
          <div className="absolute w-full h-full  bg-gradient-to-tr from-slate-900 to-slate-900 rounded-br-full rounded-tl-full rounded-tr-full shadow-2xl shadow-black ring-8 ring-orange-400 ring-offset-orange-300 ring-offset-8 flex flex-col items-center justify-center">
            <div
              className=" grid grid-cols-3 gap-2
        "
            >
              {categoryData?.map((food) => (
                <motion.div
                  key={food.id}
                  className={`flex flex-col items-center justify-center
                p-2 bg-gradient-to-r from-orange-300 to-orange-400
                 shadow-lg  hover:shadow-orange-400 ring-8 ring-slate-800 rounded-md`}
                >
                  <div
                    className={`md:w-[100px] md:h-[100px] w-[60px] h-[60px]
                    
                 flex items-center justify-center`}
                  >
                    <span>
                      <img src={food.icon} alt="icon" />
                    </span>
                  </div>
                  <p
                    className={`capitalize md:text-base text-sm tracking-wide   font-semibold mt-2 text-slate-800`}
                  >
                    {food.urlParamName}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
