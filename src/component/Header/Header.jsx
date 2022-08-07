import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { CgMenuBoxed } from 'react-icons/cg';
import { ImCross } from 'react-icons/im';
import { BiLogIn, BiSearch, BiUserPlus } from 'react-icons/bi';

import { MdShoppingCart, MdLogout, MdSell } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { cartOpenActions } from '../../store/cartOpenSlice';
import { AuthContext } from '../../Context/AuthContext';
import blankPfp from '../../img/blankPfp.png';
import useSignOut from '../../Hooks/useSignOut';
import { FaHome } from 'react-icons/fa';
import { RiUserUnfollowFill } from 'react-icons/ri';
import { BsBagCheckFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { GiKnifeFork } from 'react-icons/gi';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const items = useSelector((state) => state.cartUpdate.items);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userSignOut } = useSignOut();

  const toggleHandler = () => {
    dispatch(cartOpenActions.toggleCart());
  };
  const totalQuantity = useSelector((state) => state.cartUpdate.totalQuantity);

  const searchInputHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${searchInput}`);
    setSearch(false);
  };
  return (
    <header className="fixed z-50 w-screen xl:px-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-b-md">
      {/* desktop & tab start*/}
      <div className="hidden lg:flex w-full h-full p-2 justify-between">
        <NavLink to={'/'}>
          {' '}
          <div className="cursor-pointer flex items-center gap-2 rounded-md shadow-sm  shadow-orange-400 bg-gradient-to-r from-slate-800 to-slate-900 px-2">
            <p className="text-orange-300 text-4xl font-shadow flex gap-1">
              Food <GiKnifeFork className="text-orange-400" /> Bazaar
            </p>
          </div>
        </NavLink>
        <div className="flex items-center gap-6 text-orange-300 tracking-wider rounded-full  font-semibold">
          <motion.ul
            initial={{ opcity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="relative flex gap-6 items-center ml-auto "
          >
            {' '}
            <NavLink to={'/'}>
              <div className=" group flex items-center gap-1 ">
                <FaHome className="group-hover:text-orange-400 text-xl " />
                <li className="group-hover:text-orange-400 text-base  cursor-pointer duration-100 transition-all ease-in-out">
                  Home
                </li>
              </div>
            </NavLink>
            <NavLink to={'/createItem'}>
              <div className=" group flex items-center gap-1">
                <MdSell className="text-xl group-hover:text-orange-400" />
                <li className="group-hover:text-orange-400 text-base  cursor-pointer duration-100 transition-all ease-in-out">
                  Sell Item
                </li>
              </div>
            </NavLink>
            <div className="relative">
              <ul
                className="text-base hover:text-orange-400 cursor-pointer duration-100 transition-all ease-in-out flex items-center gap-1"
                onClick={() => setCategoryOpen((prev) => !prev)}
              >
                {' '}
                {categoryOpen ? (
                  <IoMdArrowDropup className="text-2xl" />
                ) : (
                  <IoMdArrowDropdown className="text-2xl" />
                )}
                Categories
              </ul>{' '}
              {categoryOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute bg-gradient-to-r from-slate-800 to-slate-900 p-2 whitespace-nowrap shadow-md shadow-slate-800 rounded-md flex flex-col gap-1 border border-orange-300 mt-4"
                >
                  <Link to={'category/drinks'}>
                    <li
                      className="border-b border-orange-400 text-orange-300 hover:underline tracking-wide font-semibold p-2"
                      onClick={() => setCategoryOpen((prev) => !prev)}
                    >
                      Soft Drink
                    </li>
                  </Link>
                  <Link to={'/category/ice cream'}>
                    <li
                      className="border-b border-orange-400 text-orange-300 hover:underline tracking-wide font-semibold p-2"
                      onClick={() => setCategoryOpen((prev) => !prev)}
                    >
                      Ice Cream
                    </li>
                  </Link>
                  <Link to={'/category/fruit'}>
                    <li
                      className="border-b border-orange-400 text-orange-300 hover:underline tracking-wide font-semibold p-2"
                      onClick={() => setCategoryOpen((prev) => !prev)}
                    >
                      Fruit
                    </li>
                  </Link>
                  <Link to={'/category/cooked food'}>
                    <li
                      className="border-b border-orange-400 text-orange-300 hover:underline tracking-wide font-semibold p-2"
                      onClick={() => setCategoryOpen((prev) => !prev)}
                    >
                      Cooked Food
                    </li>
                  </Link>
                  <Link to={'/category/meat'}>
                    <li
                      className=" border-orange-400 text-orange-300 hover:underline  tracking-wide font-semibold p-2"
                      onClick={() => setCategoryOpen((prev) => !prev)}
                    >
                      Meat
                    </li>
                  </Link>
                </motion.div>
              )}
            </div>
            {user && items.length > 0 && (
              <NavLink to={'/checkout'}>
                <li className="text-base hover:text-orange-400 cursor-pointer duration-100 transition-all ease-in-out flex items-center gap-1">
                  <BsBagCheckFill className="text-xl" /> Checkout
                </li>
              </NavLink>
            )}{' '}
            {user && (
              <NavLink to={'/orders'}>
                <li className="text-base hover:text-orange-400 cursor-pointer duration-100 transition-all ease-in-out flex items-center gap-1">
                  <TbTruckDelivery className="text-xl" /> Your Orders
                </li>
              </NavLink>
            )}
            <div
              className="relative group flex items-center gap-1 "
              onClick={() => setSearch((prev) => !prev)}
            >
              <BiSearch className="text-xl group-hover:text-orange-400 cursor-pointer" />
              <li className="group-hover:text-orange-400 text-base  cursor-pointer duration-100 transition-all ease-in-out">
                Search
              </li>
            </div>
            {search && (
              <motion.form
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onSubmit={searchInputHandler}
                className={`w-56  shadow-md shadow-slate-800 border border-orange-300  rounded-md flex absolute  right-0 ${
                  !user ? 'md:right-[200px]' : 'right-0'
                } mt-[85px]`}
              >
                <input
                  className="w-full h-full p-[5px] bg-gradient-to-r from-slate-800 to-slate-900  outline-none px-2 text-orange-400 font-semibold tracking-wide py-2"
                  placeholder="search..."
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button>
                  <BiSearch className="bg-slate-900 h-[34px] w-9" />
                </button>
              </motion.form>
            )}
            {!user && (
              <>
                {' '}
                <NavLink to={'/login'}>
                  <div className=" group flex items-center gap-1">
                    <BiLogIn className="text-xl group-hover:text-orange-400" />
                    <li className="group-hover:text-orange-400 text-base  cursor-pointer duration-100 transition-all ease-in-out">
                      Login
                    </li>
                  </div>
                </NavLink>{' '}
                <NavLink to={'/signup'}>
                  <div className=" group flex items-center gap-1">
                    <BiUserPlus className="text-xl group-hover:text-orange-400" />
                    <li className="group-hover:text-orange-400 text-base  cursor-pointer duration-100 transition-all ease-in-out">
                      SignUp
                    </li>
                  </div>
                </NavLink>
              </>
            )}
          </motion.ul>
          <div
            className="group  relative flex items-center justify-center cursor-pointer"
            onClick={toggleHandler}
          >
            <MdShoppingCart className="group-hover:text-orange-400 text-orange-300 text-3xl" />

            <div
              className="absolute text-orange-300  rounded-full flex w-4 h-4 
           items-center justify-center right-0 -top-[13px]"
            >
              <p className="text-base font-bold group-hover:text-orange-400">
                {totalQuantity}
              </p>
            </div>
          </div>
          <div className="relative">
            {user && (
              <motion.img
                whileTap={{ scale: 0.7 }}
                src={blankPfp}
                alt="user-profile"
                className="w-10
           min-w-[40px] h-10 min-h-[40px] rounded-full border-2 border-orange-400 cursor-pointer"
                onClick={() => setMenuOpen((prev) => !prev)}
              />
            )}
            {menuOpen && user && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="right-0 absolute bg-gradient-to-r from-slate-800 to-slate-900 p-2 whitespace-nowrap shadow-md shadow-slate-800 rounded-md flex flex-col gap-1 border border-orange-300 mt-2"
              >
                <p
                  className=" flex items-center justify-center gap-1 text-orange-300  tracking-wide font-semibold p-2"
                  onClick={() => userSignOut()}
                >
                  {user.email}
                </p>{' '}
                <p
                  className=" flex items-center justify-center gap-1 text-orange-300 hover:text-orange-500 tracking-wide font-semibold p-2 cursor-pointer"
                  onClick={() => userSignOut()}
                >
                  <MdLogout className="text-red-600" />
                  Log Out
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* desktop & tab end */}

      {/* mobile starts here */}
      <div className="lg:hidden w-full h-full px-6 py-2 flex items-center justify-between">
        <NavLink to={'/'}>
          {' '}
          <div className="cursor-pointer flex items-center gap-2 rounded-md shadow-sm  shadow-orange-400 bg-gradient-to-r from-slate-800 to-slate-900 xsm:px-2">
            <p className="text-orange-300 semism:text-4xl 2xsm:text-2xl  font-shadow flex gap-1">
              Food <GiKnifeFork className="text-orange-400" /> Bazaar
            </p>
          </div>
        </NavLink>

        <div className="relative flex gap-2 justify-center">
          <div
            className="relative group flex items-center gap-1 "
            onClick={() => setSearch((prev) => !prev)}
          >
            <BiSearch className="text-4xl group-hover:text-orange-400 text-orange-300" />
          </div>
          {search && (
            <motion.form
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onSubmit={searchInputHandler}
              className="2xsm:w-56 w-40  shadow-md shadow-slate-800 border border-orange-300  rounded-md flex absolute 2xsm:right-[80px] right-0  mt-[47px]"
            >
              <input
                className="w-full h-full p-[5px] bg-gradient-to-r from-slate-800 to-slate-900  outline-none px-2 text-orange-400 font-semibold tracking-wide py-2"
                placeholder="search..."
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button>
                <BiSearch className="bg-slate-900 h-[34px] w-9 text-orange-400 cursor-pointer" />
              </button>
            </motion.form>
          )}
          <div
            className=" relative flex items-center justify-center cursor-pointer"
            onClick={toggleHandler}
          >
            <MdShoppingCart className="group-hover:text-orange-400 text-orange-300 text-3xl" />
            <div
              className="absolute text-orange-300  rounded-full flex w-4 h-4 
           items-center justify-center right-0 -top-[8px]"
            >
              <p className="text-base font-bold group-hover:text-orange-400">
                {totalQuantity}
              </p>
            </div>
          </div>
          {!menuOpen ? (
            <CgMenuBoxed
              className="w-full h-[40px]
            text-orange-400 cursor-pointer hover:text-orange-500 transition-all ease-in-out duration-100"
              onClick={() => setMenuOpen((prev) => !prev)}
            />
          ) : (
            <ImCross
              className="w-full h-[40px]
          text-orange-400 border border-orange-300 p-2 rounded-3xl cursor-pointer hover:text-orange-500 transition-all ease-in-out duration-100"
              onClick={() => setMenuOpen((prev) => !prev)}
            />
          )}
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute bg-gradient-to-r from-slate-800 to-slate-900 whitespace-nowrap  shadow-slate-800 flex flex-col gap-1 border  mr-8 px-2 py-2 shadow-xl rounded-xl -right-9  top-10 
              border-b border-orange-400 text-orange-300  tracking-wide font-semibold p-2"
            >
              <div className="flex items-center justify-center gap-1 mb-3">
                {user ? (
                  <motion.img
                    whileTap={{ scale: 0.7 }}
                    src={blankPfp}
                    alt="user-profile"
                    className="w-10
                min-w-[40px] h-10 min-h-[40px] rounded-full"
                  />
                ) : (
                  <RiUserUnfollowFill
                    className="w-10 h-10 border border-slate-900 shadow-sm shadow-orange-400
                  min-w-[30px] rounded-full bg-orange-400 text-slate-900 p-1"
                  />
                )}

                {user ? (
                  <p className="text-sm">{user.email}</p>
                ) : (
                  <p className="text-sm">Not Logged In</p>
                )}
              </div>
              <ul className="flex flex-col gap-2 px-4 justify-center">
                <NavLink to={'/'}>
                  <div className=" group flex items-center gap-1  ">
                    <FaHome className="group-hover:text-orange-400 text-xl " />
                    <li
                      onClick={() => setMenuOpen((prev) => !prev)}
                      className="group-hover:text-orange-400 text-base  cursor-pointer duration-100 transition-all ease-in-out"
                    >
                      Home
                    </li>
                  </div>
                </NavLink>
                {user && items?.length > 0 && (
                  <NavLink to={'/checkout'}>
                    <li
                      className="text-base hover:text-orange-400 cursor-pointer duration-100 transition-all ease-in-out flex items-center gap-1"
                      onClick={() => setMenuOpen((prev) => !prev)}
                    >
                      <BsBagCheckFill className="text-xl" /> Checkout
                    </li>
                  </NavLink>
                )}{' '}
                {user && (
                  <NavLink to={'/orders'}>
                    <li
                      className="text-base hover:text-orange-400 cursor-pointer duration-100 transition-all ease-in-out flex items-center gap-1"
                      onClick={() => setMenuOpen((prev) => !prev)}
                    >
                      <TbTruckDelivery className="text-xl" /> Your Orders
                    </li>
                  </NavLink>
                )}
                <NavLink to={'/createItem'}>
                  <div className=" group flex items-center gap-1 ">
                    <MdSell className="text-xl group-hover:text-orange-400" />
                    <p
                      className="group-hover:text-orange-400 text-base  cursor-pointer duration-100 transition-all ease-in-out"
                      onClick={() => setMenuOpen((prev) => !prev)}
                    >
                      Sell Item
                    </p>
                  </div>
                </NavLink>
                <div className="">
                  <div
                    className="flex hover:text-orange-400 cursor-pointer duration-100 transition-all ease-in-out gap-[2px]"
                    onClick={() => setCategoryOpen((prev) => !prev)}
                  >
                    {' '}
                    {categoryOpen ? (
                      <IoMdArrowDropup className=" text-2xl" />
                    ) : (
                      <IoMdArrowDropdown className="text-2xl" />
                    )}
                    <p className="text-base">Categories</p>
                  </div>
                  {categoryOpen && (
                    <div className=" mt-1 flex flex-col  text-base gap-1">
                      <Link to={'category/drinks'}>
                        <li className="active:underline p-1 border-t border-orange-300">
                          Soft Drink
                        </li>
                      </Link>
                      <Link to={'/category/ice cream'}>
                        <li className="active:underline  p-1  border-t border-orange-300">
                          Ice Cream
                        </li>
                      </Link>
                      <Link to={'/category/fruit'}>
                        <li className="active:underline  p-1 border-t border-orange-300">
                          Fruit
                        </li>
                      </Link>
                      <Link to={'/category/cooked food'}>
                        <li className="active:underline  p-1 border-t border-orange-300">
                          Cooked Food
                        </li>
                      </Link>
                      <Link to={'/category/meat'}>
                        <li className="active:underline  p-1 border-t border-b border-orange-300">
                          Meat
                        </li>
                      </Link>
                    </div>
                  )}
                </div>
                {!user && (
                  <>
                    <NavLink to={'/login'}>
                      <div className=" group flex items-center gap-1">
                        <BiLogIn className="text-xl group-hover:text-orange-400" />
                        <li className="group-hover:text-orange-400 text-base  cursor-pointer duration-100 transition-all ease-in-out">
                          Login
                        </li>
                      </div>
                    </NavLink>{' '}
                    <NavLink to={'/signup'}>
                      <div className=" group flex items-center gap-1">
                        <BiUserPlus className="text-xl group-hover:text-orange-400" />
                        <li className="group-hover:text-orange-400 text-base  cursor-pointer duration-100 transition-all ease-in-out">
                          SignUp
                        </li>
                      </div>
                    </NavLink>
                  </>
                )}
              </ul>
              {user && (
                <p
                  className="flex px-2 py-2 pr-5  items-center justify-center gap-2 hover:bg-white hover:bg-opacity-5 text-orange-300 rounded-lg transition-all duration-100 ease-in-out cursor-pointer"
                  onClick={() => userSignOut()}
                >
                  Log Out <MdLogout className="text-red-600" />
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* mobile ends here */}
    </header>
  );
};

export default Header;
