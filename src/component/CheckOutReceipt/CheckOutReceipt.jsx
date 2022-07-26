import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useFetchCollection from '../../Hooks/useFetchCollection';
import { FaAddressCard } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteField, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

const CheckOutReceipt = (props) => {
  const [addressToggle, setAddressToggle] = useState(false);
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [notAddedItems, setNotAddedItems] = useState(0);
  const [notSameProduct, setNotSameProduct] = useState(0);
  const { user } = useContext(AuthContext);
  const { foods } = useFetchCollection('cart', ['id', '==', user.uid]);
  const items = useSelector((state) => state.cartUpdate.items);

  const totalProductPrice = useSelector(
    (state) => state.cartUpdate.totalProductPrice
  );
  const order = useSelector((state) => state.order.order);

  const cartTotalQuantity = useSelector(
    (state) => state.cartUpdate.totalQuantity
  );
  const savedTotalQuantity = order[0]?.totalQuantity;
  const totalOrderPrice = order[0]?.totalProductPrice;

  useEffect(() => {
    setNotAddedItems(cartTotalQuantity - savedTotalQuantity);
    setNotSameProduct(totalOrderPrice - totalProductPrice);
  }, [
    cartTotalQuantity,
    savedTotalQuantity,
    totalOrderPrice,
    totalProductPrice,
  ]);

  const saveNewInfo = async () => {
    let ref = await doc(db, 'cart', user.uid);
    await updateDoc(
      ref,
      {
        id: user.uid,
        items: items,
        totalQuantity: cartTotalQuantity,
        totalProductPrice: totalProductPrice,
      },
      { merge: true }
    );
    setNotAddedItems(0);
  };
  const deleteCart = async () => {
    const deleteRef = doc(db, 'cart', user.uid);
    await updateDoc(deleteRef, {
      id: deleteField(),
      items: deleteField(),
      totalProductPrice: deleteField(),
      totalQuantity: deleteField(),
      deliveryInfo: deleteField(),
    });
  };
  return (
    <div>
      {props.shippingAdress && (
        <div
          className={`flex justify-between h-full w-full ${
            addressToggle
              ? 'bg-gradient-to-tr from-slate-900 to-slate-800'
              : 'bg-gradient-to-tr from-slate-800 to-slate-900'
          }   cursor-pointer gap-4 rounded-md border-2 border-orange-500 p-5 shadow-md shadow-slate-800`}
          onClick={() => setAddressToggle((prev) => !prev)}
        >
          <div className="w-full flex xsm:flex-row flex-col xsm:items-center gap-5">
            <FaAddressCard className="rounded-md border-2 border-orange-400 text-5xl text-orange-500 shadow-md  shadow-green-300" />
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center gap-1">
                <p className="sm:text-lg text-base font-semibold tracking-wider text-orange-400">
                  {notAddedItems === 0 && notSameProduct === 0 ? (
                    <p>
                      Orders and Shipping Address Saved{' '}
                      <TiTick className="text-2xl text-green-600" />
                    </p>
                  ) : notAddedItems > 0 && notSameProduct > 0 ? (
                    <>
                      <p className="flex  text-orange-500">
                        Shipping Address Saved
                        <TiTick className="text-2xl text-green-600" />
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <p className="  text-orange-500">
                          You Have Not Saved Your Order After adding{' '}
                          <span className=" text-xl font-bold">
                            {notAddedItems}
                          </span>
                          {notAddedItems > 1 ? ' items' : ' item'}
                          <ImCross className="text-base text-red-500" />
                        </p>
                        <p> </p>
                      </div>
                    </>
                  ) : notAddedItems < 0 && notSameProduct < 0 ? (
                    <>
                      <p className="flex items-center gap-2  text-orange-500">
                        Shipping Address Saved
                        <TiTick className="text-2xl text-green-600" />
                      </p>
                      <p>
                        You Have not saved your order after removing
                        {Math.abs(notAddedItems)} items
                        <ImCross className="text-base  text-red-500" />
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="flex items-center gap-2  text-orange-500">
                        Shipping Address Saved
                        <TiTick className="text-2xl text-green-600" />
                      </p>
                      <p>
                        You Have not saved your order after updating your cart
                        <ImCross className="text-base  text-red-500" />
                      </p>
                    </>
                  )}
                </p>
              </div>
              {!addressToggle ? (
                <span className="text-sm tracking-wider text-orange-300 ">
                  (Click To Expand)
                </span>
              ) : (
                <span className="text-sm tracking-wider text-orange-300 ">
                  (Click To Minimize)
                </span>
              )}
            </div>
          </div>
          <div className="">
            <button
              onClick={deleteCart}
              className="bg-gradient-to-tr from-orange-300 to-orange-400 hover:bg-gradient-to-tr hover:from-orange-400 hover:to-orange-300 2xsm:p-2 text-slate-800 sm:font-semibold transition-all duration-150 ease-in-out rounded-md border-2 border-slate-700 shadow-sm shadow-orange-400"
            >
              Delete Order
            </button>
          </div>
        </div>
      )}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-orange-300 shadow-md shadow-slate-800">
        {addressToggle && (
          <>
            <h2 className="py-5 text-center text-2xl font-bold text-orange-400 ">
              Your Ordered Items
            </h2>
            {notAddedItems !== 0 || notSameProduct !== 0 ? (
              <div
                className="mb-3 flex items-center justify-center"
                onClick={saveNewInfo}
              >
                <button className="rounded-md bg-gradient-to-tr from-orange-300 to-orange-400 md:p-4 p-2 text-lg font-semibold text-gray-900 transition-all duration-150 ease-in-out hover:bg-gradient-to-tr hover:from-orange-400 hover:to-orange-300 border-2 border-slate-800 shadow-sm shadow-orange-300">
                  {notAddedItems > 0 ? (
                    <p>Save Newly Added Items</p>
                  ) : (
                    <p>Save the updated order</p>
                  )}
                </button>
              </div>
            ) : (
              ''
            )}

            <div className="grid  grid-cols-4 text-center gap-[1px] font-semibold text-orange-400">
              <p className="    w-full bg-gradient-to-r from-slate-800 to-slate-900  py-5  text-sm 2xsm:text-base">
                Image
              </p>
              <p className="    w-full bg-gradient-to-r from-slate-800 to-slate-900 py-5  text-sm 2xsm:text-base">
                {' '}
                Name
              </p>
              <p className="   w-full bg-gradient-to-r from-slate-800 to-slate-900  py-5 text-sm 2xsm:text-base">
                {' '}
                Amount
              </p>
              <p className="    w-full bg-gradient-to-r from-slate-800 to-slate-900 py-5 text-sm 2xsm:text-base">
                Price
              </p>
            </div>
            <div className="mt-4 flex flex-col first:border-b-0">
              {order?.map((orders) => {
                return (
                  <div key={orders.id}>
                    {orders.items.map((item) => (
                      <div
                        key={item.id}
                        className="grid w-full h-full grid-cols-4 items-center  rounded-md  bg-gradient-to-r from-slate-800 to-slate-900  text-center text-orange-300 tracking-wide border-t border-slate-900"
                      >
                        <div className="flex w-full items-center justify-center bg-gradient-to-r from-slate-800 to-slate-900 h-full">
                          <img
                            src={item.img}
                            alt="item"
                            className="h-[30px] w-[30px] 2xsm:h-[50px] 2xsm:w-[50px] object-contain"
                          />
                        </div>
                        <div className="w-full py-5 text-sm 2xsm:text-base bg-gradient-to-r from-slate-800 to-slate-900">
                          <h3>{item.title}</h3>
                        </div>
                        <div className="w-full py-5 bg-gradient-to-r from-slate-800 to-slate-900">
                          <h3>{item.quantity}</h3>
                        </div>
                        <div className="w-full py-5 text-sm 2xsm:text-base bg-gradient-to-r from-slate-800 to-slate-900">
                          <h3>{Number(item.totalPrice).toFixed(2)}</h3>
                        </div>
                      </div>
                    ))}
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-5 text-center text-orange-400 tracking-wide font-semibold ">
                      <h3>Total Items: {orders?.totalQuantity}</h3>
                      <h3>
                        Total Payable Amount:{' '}
                        <span className="text-green-500">$ </span>
                        {orders?.totalProductPrice.toFixed(2)}
                        <span className="text-sm text-red-600">
                          {' '}
                          (including delivery charge)
                        </span>
                      </h3>{' '}
                      <Link to="/">
                        <button className="mt-3 rounded-md bg-gradient-to-tr from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 p-2 md:text-lg text-base font-semibold  transition-all duration-150 ease-in-out hover:bg-gradient-to-tr text-orange-300 border border-orange-400 shadow-sm shadow-gray-900">
                          Add More Items To Cart
                        </button>
                      </Link>
                    </div>

                    <div className="mt-2 rounded-md bg-gradient-to-l from-slate-800 to-slate-900 p-4 leading-9">
                      <h2 className="rounded-md  py-3 text-center text-lg font-semibold md:px-5 md:text-left text-orange-400 tracking-wide">
                        Your Orders Will Be Delivered To the Following Address
                        After Payment
                      </h2>

                      <div className="mt-1 flex flex-col justify-center  rounded-md text-orange-300 tracking-wide font-semibold border border-orange-400 px-3">
                        <p className="capitalize">
                          <span className="text-orange-400">Name :</span>{' '}
                          {orders.deliveryInfo.firstName +
                            ' ' +
                            orders.deliveryInfo.lastName}
                        </p>
                        <p className="capitalize">
                          <span className="text-orange-400">
                            {' '}
                            Mobile Number :{' '}
                          </span>{' '}
                          {orders.deliveryInfo.mobileNumber}
                        </p>
                        <p className="capitalize">
                          <span className="text-orange-400"> Address : </span>
                          {orders.deliveryInfo.address}
                        </p>
                        <p className="capitalize">
                          <span className="text-orange-400">City : </span>
                          {orders.deliveryInfo.city}
                        </p>
                        <p className="capitalize">
                          <span className="text-orange-400">Country : </span>

                          {orders.deliveryInfo.country}
                        </p>
                        <p className="capitalize">
                          <span className="text-orange-400">PostalCode : </span>

                          {orders.deliveryInfo.postalCode}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {props.payment && (
          <div
            className="flex h-full w-full cursor-pointer gap-4 rounded-md bg-white p-5 shadow-xl"
            onClick={() => setPaymentToggle((prev) => !prev)}
          >
            <FcMoneyTransfer className="text-5xl text-orange-500 shadow-md shadow-green-300" />
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1">
                <p className="text-lg tracking-wide">Payment Info Received</p>

                <TiTick className="text-2xl text-green-600" />
              </div>
            </div>
          </div>
        )}

        {paymentToggle && (
          <div className="mt-1 rounded-lg bg-gradient-to-r from-orange-200 to-orange-300">
            <h1 className="rounded-md bg-gray-400 bg-opacity-30 py-4 px-7 text-3xl font-semibold">
              Payment Information
            </h1>
            <div className="flex flex-col gap-2 bg-slate-900 bg-opacity-10 p-5 text-lg tracking-wider">
              <p className="rounded-md bg-white bg-opacity-20 p-4">
                Payment Method : {foods[0]?.paymentInfo[0].paymentMethod}
              </p>
              <p className="rounded-md bg-white bg-opacity-20 p-4">
                Payment Mobile Number :
                {foods[0]?.paymentInfo[0].paymentMobileNumber}
              </p>
              <p className="rounded-md bg-white bg-opacity-20 p-4">
                Payment Mobile Number :
                {foods[0]?.paymentInfo[0].referenceNumber}
              </p>
            </div>
          </div>
        )}
      </div>
      Your Orders will be delivered within 2-7 bussiness days. Meanwhile keep on
      shopping.
    </div>
  );
};

export default CheckOutReceipt;
