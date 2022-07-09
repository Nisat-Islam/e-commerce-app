import React, { useContext, useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { FaUserAlt, FaAddressCard } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { AuthContext } from '../../Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { cartUpdateActions } from '../../store/cartUpdateSlice';
import {
  arrayUnion,
  deleteField,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import useFetchCollection from '../../Hooks/useFetchCollection';
import bkashLogo from '../../img/BKash-logo.png';
import CheckOutReceipt from '../../component/CheckOutReceipt/CheckOutReceipt';
import { orderActions } from '../../store/orderSlice';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [house, setHouse] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [postalCode, setPostalCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [msg, setMsg] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentMobileNumber, setPaymentMobileNumber] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [discount, setDiscount] = useState();
  const dispatch = useDispatch();
  const { foods } = useFetchCollection('cart', ['id', '==', user.uid]);
  const { foods: orderDb } = useFetchCollection('orders', [
    'id',
    '==',
    user.uid,
  ]);
  const navigate = useNavigate();
  let items = useSelector((state) => state.cartUpdate.items);
  useEffect(() => {
    dispatch(orderActions.orderItem(foods));
  }, [foods, dispatch]);
  const order = useSelector((state) => state.order.order);

  const totalQuantity = useSelector((state) => state.cartUpdate.totalQuantity);
  let totalProductPrice = useSelector(
    (state) => state.cartUpdate.totalProductPrice
  );
  totalProductPrice = +totalProductPrice;

  const saveInfo = async () => {
    if (
      !firstName ||
      !lastName ||
      !postalCode ||
      !house ||
      !address ||
      !mobileNumber
    ) {
      setMsg('Please Complete All Inputs with * marks');
    } else {
      let ref = await doc(db, 'cart', user.uid);
      await setDoc(ref, {
        id: user.uid,
        items: items,
        totalQuantity: totalQuantity,
        totalProductPrice: totalProductPrice,
        deliveryInfo: {
          firstName,
          lastName,
          address,
          house,
          city,
          country,
          postalCode,
          mobileNumber,
          orderedAt: serverTimestamp(),
        },
      });
    }
  };

  useEffect(() => {
    if (totalProductPrice >= 20) {
      setDiscount(5);
    } else {
      setDiscount(0);
    }
  }, [totalProductPrice]);
  const savePaymentInfo = async () => {
    if (!paymentMethod || !paymentMobileNumber || !referenceNumber) {
      setMsg('Please Complete All Inputs with * marks');
    } else {
      if (orderDb?.length > 0) {
        const orderRef = await doc(db, 'orders', user.uid);
        await updateDoc(orderRef, {
          orders: arrayUnion(
            ...[
              {
                items: order[0].items,
                totalQuantity: order[0].totalQuantity,
                totalProductPrice: order[0].totalProductPrice,
                deliveryInfo: order[0].deliveryInfo,

                paymentMethod,
                paymentMobileNumber,
                referenceNumber,
              },
            ]
          ),
        });
      } else {
        const orderRef = await doc(db, 'orders', user.uid);
        await setDoc(orderRef, {
          id: user.uid,
          orders: [
            {
              items: order[0].items,
              totalQuantity: order[0].totalQuantity,
              totalProductPrice: order[0].totalProductPrice,
              deliveryInfo: order[0].deliveryInfo,

              paymentMethod,
              paymentMobileNumber,
              referenceNumber,
            },
          ],
        });
      }

      const deleteRef = doc(db, 'cart', user.uid);
      await updateDoc(deleteRef, {
        id: deleteField(),
        items: deleteField(),
        totalProductPrice: deleteField(),
        totalQuantity: deleteField(),
        deliveryInfo: deleteField(),
      });
      localStorage.clear();
      dispatch(cartUpdateActions.clearCart());
      dispatch(orderActions.orderItem(orderDb));
      navigate('/orderComplete');
    }
  };

  const addItemToCart = (id, title, price) => {
    dispatch(cartUpdateActions.addItemToCart({ id, title, price }));
  };
  const removeItemFromCart = (id) => {
    dispatch(cartUpdateActions.removeItemFromCart(id));
  };

  const subTotal = totalProductPrice + 3 - discount;

  const togglePayment = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div className="bg-orange-300  px-2 pt-12 md:px-5 lg:px-10">
      <div className="flex w-fit gap-4 rounded-md border-2 border-orange-400 bg-gradient-to-tr from-slate-800 to-slate-900 p-5 shadow-md shadow-slate-800 ">
        <FaUserAlt className="text-5xl text-orange-500 shadow-md shadow-green-300" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-semibold tracking-wide text-orange-400 ">
              Logged In
            </p>

            <TiTick className="text-2xl text-green-600" />
          </div>
          <div>
            <p className="tracking-wider text-orange-500">
              Email : {user.email}
            </p>
          </div>
        </div>
      </div>

      {foods?.length === 0 ? (
        <div className="mt-8 flex flex-col-reverse gap-5 md:grid md:grid-cols-3">
          <div className="col-span-2 flex flex-col">
            <div className="flex w-full flex-col gap-3">
              <h2 className="mt-4 flex items-center gap-5 rounded-md border-2 border-orange-500 bg-gradient-to-tr from-slate-800 to-slate-900  p-3 text-2xl font-bold text-orange-400 shadow-md shadow-slate-800 ">
                <FaAddressCard className="text-4xl text-orange-400" /> Shipping
                Address
              </h2>
              <div className="flex flex-col gap-5 rounded-md border-2 border-orange-500 bg-gradient-to-tr from-slate-800 to-slate-900 p-5">
                <div className="mt-5  grid grid-cols-1 semism:grid-cols-2 semism:gap-5 gap-3">
                  <div className=" flex flex-col items-start gap-3">
                    <label className="font-semibold tracking-wide text-orange-400 ">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      placeholder="first name..."
                      className="h-10 w-full rounded-md max-w-[350px] border-[0.5px] border-orange-300 bg-gradient-to-tr from-slate-700 to-slate-800 px-3 text-lg text-orange-400
                  shadow-lg outline-none placeholder:text-center placeholder:text-base placeholder:italic"
                    />
                  </div>
                  <div className=" flex flex-col items-start gap-3">
                    <label className="font-semibold tracking-wide text-orange-400 ">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      placeholder="last name..."
                      className="h-10 w-full rounded-md max-w-[350px] border-[0.5px] border-orange-300 bg-gradient-to-tr from-slate-700 to-slate-800 px-3 text-lg text-orange-400
                      shadow-lg outline-none placeholder:text-center placeholder:text-base placeholder:italic"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 semism:grid-cols-2 semism:gap-5 gap-3">
                  <div className="flex flex-col items-start gap-3">
                    <label className="font-semibold tracking-wide text-orange-400 ">
                      Address
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      placeholder="address..."
                      className="h-10 w-full rounded-md max-w-[350px] border-[0.5px] border-orange-300 bg-gradient-to-tr from-slate-700 to-slate-800 px-3 text-lg text-orange-400
                  shadow-lg outline-none placeholder:text-center placeholder:text-base placeholder:italic"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <label className="font-semibold tracking-wide text-orange-400 ">
                      House no.
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                      type="text"
                      placeholder="house number..."
                      className="h-10 w-full rounded-md max-w-[350px] border-[0.5px] border-orange-300 bg-gradient-to-tr from-slate-700 to-slate-800 px-3 text-lg text-orange-400
                      shadow-lg outline-none placeholder:text-center placeholder:text-base placeholder:italic"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 semism:grid-cols-2 semism:gap-5 gap-3">
                  <div className="flex flex-col items-start gap-3">
                    <label className="font-semibold tracking-wide text-orange-400 ">
                      City
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      placeholder="city..."
                      className="h-10 w-full rounded-md max-w-[350px] border-[0.5px] border-orange-300 bg-gradient-to-tr from-slate-700 to-slate-800 px-3 text-lg text-orange-400
                      shadow-lg outline-none placeholder:text-center placeholder:text-base placeholder:italic"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <label className="font-semibold tracking-wide text-orange-400 ">
                      Country
                    </label>
                    <input
                      value={country}
                      readOnly
                      type="text"
                      className="h-10 w-full rounded-md max-w-[350px] border-[0.5px] border-orange-300 bg-gradient-to-tr from-slate-700 to-slate-800  px-3 text-lg text-green-500
                      shadow-lg outline-none placeholder:text-center placeholder:text-base placeholder:italic"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 semism:grid-cols-2 semism:gap-5 gap-3">
                  <div className="flex flex-col items-start gap-3">
                    <label className="font-semibold tracking-wide text-orange-400 ">
                      Post Code
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      type="text"
                      placeholder="post code..."
                      className="h-10 w-full  max-w-[350px] rounded-md border-[0.5px] border-orange-300 bg-gradient-to-tr from-slate-700 to-slate-800 px-3 text-lg text-orange-400
                      shadow-lg outline-none placeholder:text-center placeholder:text-base placeholder:italic"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <label className="font-semibold tracking-wide text-orange-400 ">
                      Mobile Number
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      type="text"
                      placeholder="Mobile Number..."
                      className="h-10 w-full max-w-[350px] rounded-md border-[0.5px] border-orange-300 bg-gradient-to-tr from-slate-700 to-slate-800 px-3 text-lg text-orange-400
                      shadow-lg outline-none placeholder:text-center placeholder:text-base placeholder:italic"
                    />
                  </div>
                </div>

                {(!firstName ||
                  !lastName ||
                  !postalCode ||
                  !house ||
                  !address ||
                  !mobileNumber) && <p className="text-red-500">{msg}</p>}
                <div className="flex items-center gap-10">
                  <button
                    className={` w-full rounded-md border border-orange-400 bg-gradient-to-tr from-slate-800 to-slate-900 px-5 py-2 font-semibold text-orange-400 transition-all duration-150 ease-in-out hover:bg-gradient-to-tr hover:from-slate-900 hover:to-slate-800 hover:text-orange-500 sm:w-auto`}
                    onClick={saveInfo}
                  >
                    Save Info
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="top-0 right-0 h-full w-full md:sticky md:-mt-32 md:w-auto">
            <h5
              className="bold flex items-center gap-5 rounded-md 
            border-2 border-orange-500 bg-gradient-to-tr from-slate-800 to-slate-900 p-3 text-xl font-bold
             tracking-wide text-orange-400 shadow-md shadow-slate-900"
            >
              <BsFillCartCheckFill className="text-4xl text-orange-400" /> Your
              Orders
            </h5>
            <div
              className="mt-4 h-full w-full rounded-3xl
             border-2 border-orange-400 bg-gradient-to-tr from-slate-800 to-slate-900 shadow-md
              shadow-slate-800"
            >
              <div className="h-full w-full 2xsm:p-3 md:p-0 lg:p-3">
                <div className="h-[350px] overflow-y-scroll ">
                  {items?.map((food) => (
                    <div
                      key={food.id}
                      className="flex  w-full flex-col items-center 
                  justify-center gap-4 border border-orange-400 bg-white bg-opacity-10 
                  p-3 2xsm:flex-row 2xsm:items-center 2xsm:justify-between"
                    >
                      <div className="flex gap-3">
                        <div className="w-14 h-full object-contain md:w-[25px] md:h-[30px]  lg:w-[30px] lg:h-[35px]">
                          <img
                            src={food.img}
                            alt="product"
                            className="w-full"
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <p className="text-white">{food.title}</p>
                          <p
                            className="font-bold text-orange-300 first-letter:text-xl 
                        first-letter:font-bold first-letter:text-green-600 "
                          >
                            $ {(food.price * food.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div
                        className="flex flex-col-reverse items-center 
                    justify-center gap-2 text-2xl  text-white"
                      >
                        <div onClick={() => removeItemFromCart(food.id)}>
                          <p className="cursor-pointer">
                            <BiMinus />
                          </p>
                        </div>
                        <div>
                          <p>{food.quantity}</p>
                        </div>
                        <div
                          onClick={() =>
                            addItemToCart(food.id, food.title, food.price, user)
                          }
                        >
                          <p className="cursor-pointer">
                            <BiPlus />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex w-full h-full flex-col bg-opacity-10 ">
                  <div
                    className=" flex flex-col gap-5 border-2  border-t-0 border-orange-400
                   bg-white bg-opacity-5 p-4 font-semibold lg:px-16"
                  >
                    <div className="flex items-center justify-between">
                      <p className="tracking-wide text-white">
                        Total Product Price
                      </p>
                      <p className="tracking-wide text-orange-300 first-letter:text-green-500">
                        $ {totalProductPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="tracking-wide text-white">
                        Delivery Charge
                      </p>
                      <p className="text-orange-300 first-letter:text-green-500">
                        $ 3
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="tracking-wide text-white">Discount</p>
                      <p className="text-orange-300 first-letter:text-green-500">
                        - {discount}
                      </p>
                    </div>
                    <div className="h-[1px] w-full bg-orange-300" />
                    <div
                      className="mt-2 flex items-start justify-between text-lg
                     font-semibold text-white"
                    >
                      <p>Total</p>
                      <p className="text-orange-300 first-letter:text-green-500">
                        $ {subTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Total Section */}
            </div>
          </div>
        </div>
      ) : (
        <>
          <CheckOutReceipt shippingAdress={true} />
        </>
      )}

      {!foods[0]?.paymentInfo ? (
        <div className="w-full md:grid md:grid-cols-3">
          <div className="col-span-2 pb-10">
            <h2 className="mt-4 flex items-center gap-5 rounded-md border-2 border-orange-500 bg-gradient-to-tr from-slate-800 to-slate-900  p-3 text-2xl font-bold text-orange-400 shadow-md shadow-slate-800 ">
              <FcMoneyTransfer className="text-4xl text-orange-500" /> Choose
              Payment Method
            </h2>
            <div>
              <div
                className="mt-5 h-[80px] w-fit cursor-pointer rounded-xl bg-white shadow-2xl
                
                "
                onClick={togglePayment}
              >
                <img
                  src={bkashLogo}
                  alt="bkash-logo"
                  className={`h-full ${
                    toggle && 'ring-2 ring-pink-400'
                  } rounded-lg hover:ring-1 hover:ring-pink-400`}
                  onClick={() => setPaymentMethod('Bkash')}
                />
              </div>{' '}
              {toggle && (
                <div className="lg:text-center mt-10 rounded-md border-2 border-orange-400 bg-gradient-to-tr from-slate-800 to-slate-900 p-5 shadow-md shadow-slate-900">
                  <p className="text-xl font-bold  tracking-wide text-orange-500">
                    How To Pay :
                  </p>
                  <div className="flex flex-col gap-3">
                    <p className="font-semibold tracking-wider text-orange-400">
                      1) Send The Full Payable Amount at this number
                      <span className="text-xl">
                        <br /> +abcdefghijk
                      </span>{' '}
                      with a reference number of your choice.
                    </p>
                    <p className="font-semibold tracking-wider text-orange-400">
                      2) Input Your Number
                      <span className="text-xl font-bold">:</span>
                    </p>
                    <div className="grid-cols grid w-full lg:justify-center">
                      <input
                        type="number"
                        className="sm:mx-5 w-full h-10 sm:max-w-[350px] rounded-md border-[0.5px] border-orange-300 bg-gradient-to-tr from-slate-700 to-slate-800  px-3 text-lg text-green-500
                      shadow-lg outline-none placeholder:text-center placeholder:text-base placeholder:italic"
                        placeholder="your number.."
                        onChange={(e) => setPaymentMobileNumber(e.target.value)}
                      />
                    </div>
                    <p className="font-semibold tracking-wider text-orange-400">
                      3) Input The Reference Number Here
                      <span className="text-xl font-bold">:</span>
                    </p>{' '}
                    <div className="grid-cols grid w-full lg:justify-center">
                      <input
                        type="number"
                        className="sm:mx-5 w-full h-10 rounded-md border-[0.5px] sm:max-w-[350px] border-orange-300 bg-gradient-to-tr from-slate-700 to-slate-800  px-3 text-lg text-green-500
                      shadow-lg outline-none placeholder:text-center placeholder:text-base placeholder:italic"
                        placeholder="reference number.."
                        onChange={(e) => setReferenceNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full  semism:px-10">
                    <button
                      className="mt-10 w-full max-w-xs rounded-md border-2 border-slate-900 bg-gradient-to-tr from-orange-400 to-orange-500 px-7 py-2 font-semibold shadow-sm shadow-orange-400 transition-all duration-150 ease-in-out hover:bg-gradient-to-tr hover:from-orange-500 hover:to-orange-400 "
                      onClick={savePaymentInfo}
                    >
                      Confirm Order
                    </button>
                  </div>
                  {msg}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <CheckOutReceipt payment={true} />
      )}
    </div>
  );
};

export default CheckOut;
