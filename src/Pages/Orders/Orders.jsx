import React, { useContext, useState } from 'react';
import { FaAddressCard } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { FcMoneyTransfer } from 'react-icons/fc';
import { MdOutlinePayments } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { AuthContext } from '../../Context/AuthContext';
import useFetchCollection from '../../Hooks/useFetchCollection';
import emptyOrder from '../../img/emptyOrder.png';
const Orders = () => {
  const [index, setIndex] = useState();
  const [orderIndex, setOrderIndex] = useState();
  const [paymentIndex, setPaymentIndex] = useState();
  const [addressToggle, setAddressToggle] = useState(false);
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [orderToggle, setOrderToggle] = useState(false);

  const { user } = useContext(AuthContext);
  const { foods: order } = useFetchCollection('orders', ['id', '==', user.uid]);

  const orderToggler = (item) => {
    if (item !== orderIndex) {
      setAddressToggle(false);
      setPaymentToggle(false);
      setOrderIndex(item);
      setOrderToggle(true);
    } else {
      setOrderToggle((prev) => !prev);
    }
  };

  const addressToggler = (item) => {
    if (item !== index) {
      setIndex(item);
      setAddressToggle(true);
    } else {
      setAddressToggle((prev) => !prev);
    }
  };

  const paymentToggler = (item) => {
    if (item !== paymentIndex) {
      setPaymentIndex(item);
      setPaymentToggle(true);
    } else {
      setPaymentToggle((prev) => !prev);
    }
  };
  return (
    <div className="py-10">
      <div>
        {order.length > 0 ? (
          <div className="flex flex-col gap-3 mt-4">
            {order?.map((orders) => {
              return (
                <div key={order.indexOf(orders)}>
                  {orders.orders.map((food) => {
                    return (
                      <div key={food.id}>
                        <div
                          className="flex w-full h-full shadow-xl rounded-md p-5 gap-4 cursor-pointer bg-gradient-to-tr from-orange-300 to-orange-400 hover:bg-gradient-to-tr hover:from-orange-400 hover:to-orange-300 transition-all duration-150 ease-in-out "
                          onClick={() =>
                            orderToggler(orders.orders.indexOf(food))
                          }
                        >
                          <TbTruckDelivery className="text-5xl text-gray-700 shadow-sm shadow-gray-700 rounded-md" />
                          <div className="flex flex-col items-start justify-center">
                            <div className="flex items-center gap-1">
                              <p className="tracking-wide text-lg text-gray-800 font-semibold">
                                {` Your Orders On ${new Date(
                                  food.deliveryInfo.orderedAt.seconds * 1000
                                ).toLocaleString('en-IN')}`}
                              </p>
                              <div className="flex items-center justify-center gap-2"></div>
                            </div>

                            <span className="text-sm">(Click To Expand)</span>
                          </div>
                        </div>
                        {orders.orders.indexOf(food) === orderIndex &&
                          orderToggle && (
                            <div className="w-full bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg shadow-md shadow-orange-400 mt-3">
                              <div
                                className="flex w-full h-full bg-orange-200 shadow-md rounded-md p-5 gap-4 cursor-pointer shadow-orange-500"
                                onClick={() =>
                                  addressToggler(orders.orders.indexOf(food))
                                }
                              >
                                <FaAddressCard className="text-5xl text-orange-500 shadow-md shadow-green-300" />
                                <div className="flex flex-col items-start justify-center">
                                  <div className="flex items-center gap-1">
                                    <p className="tracking-wide text-lg">
                                      Orders and Shipping Address Received
                                      <TiTick className="text-green-600 text-2xl" />
                                    </p>
                                    <div className="flex items-center justify-center gap-2"></div>
                                  </div>

                                  <span className="text-sm">
                                    {!addressToggle
                                      ? 'Click To Expand'
                                      : 'Click To Minimize'}
                                  </span>
                                </div>
                              </div>
                              {!addressToggle &&
                                orders.orders.indexOf(food) === orderIndex && (
                                  <div className="w-full flex items-center justify-center">
                                    <div className="w-[4px] h-16 bg-green-500 flex items-center justify-center" />
                                  </div>
                                )}
                              {index === orders.orders.indexOf(food) &&
                                addressToggle && (
                                  <>
                                    <h2 className="text-2xl font-bold py-5 text-center">
                                      Your Ordered Items
                                    </h2>
                                    <div className="flex items-start justify-around">
                                      <p className="w-full bg-orange-400 bg-opacity-70 py-5 pl-2">
                                        Image
                                      </p>
                                      <p className="w-full bg-orange-400 bg-opacity-70 py-5 pl-2">
                                        {' '}
                                        Name
                                      </p>
                                      <p className="w-full bg-orange-400 bg-opacity-70 py-5 pl-2">
                                        {' '}
                                        Amount
                                      </p>
                                      <p className="w-full bg-orange-400 bg-opacity-70 py-5 pl-2">
                                        Price
                                      </p>
                                    </div>{' '}
                                  </>
                                )}
                              {index === orders.orders.indexOf(food) &&
                                addressToggle &&
                                food.items.map((item) => {
                                  return (
                                    <div key={item.id}>
                                      <div className="w-full flex items-center justify-around bg-orange-400 bg-opacity-30 py-3 rounded-md border border-orange-500 shadow-sm shadow-orange-500">
                                        <div className="w-full text-center">
                                          <img
                                            src={item.img}
                                            alt="item"
                                            className="w-[50px] h-[50px]"
                                          />
                                        </div>
                                        <div className="w-full">
                                          <h3>{item.title}</h3>
                                        </div>
                                        <div className="w-full">
                                          <h3>{item.quantity}</h3>
                                        </div>
                                        <div className="w-full">
                                          <h3>
                                            {Number(item.totalPrice).toFixed(2)}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              {index === orders.orders.indexOf(food) &&
                                addressToggle && (
                                  <>
                                    {' '}
                                    <div className="bg-orange-400 bg-opacity-75 py-5 text-center">
                                      <h3>Total Items: {food.totalQuantity}</h3>
                                      <h3>
                                        Total Payable Amount: $
                                        {food.totalProductPrice.toFixed(2)}{' '}
                                        (including delivery charge)
                                      </h3>
                                    </div>
                                    <div className="bg-gradient-to-tr from-orange-300 to-orange-400 mt-2 rounded-md p-4 leading-9">
                                      <h2 className="text-lg font-semibold bg-white bg-opacity-20 md:px-5 py-3 rounded-md md:text-left text-center">
                                        Your Orders Will Be Delivered To the
                                        Following Address After Payment
                                      </h2>

                                      <div className="bg-white bg-opacity-20 rounded-md px-3  mt-1 flex flex-col justify-center">
                                        <p className="capitalize">
                                          Name:{' '}
                                          {food.deliveryInfo.firstName +
                                            ' ' +
                                            food.deliveryInfo.lastName}
                                        </p>
                                        <p className="capitalize">
                                          Mobile Number:{' '}
                                          {food.deliveryInfo.mobileNumber}
                                        </p>
                                        <p className="capitalize">
                                          Address: {food.deliveryInfo.address}
                                        </p>
                                        <p className="capitalize">
                                          City: {food.deliveryInfo.city}
                                        </p>
                                        <p className="capitalize">
                                          Country: {food.deliveryInfo.country}
                                        </p>
                                        <p className="capitalize">
                                          PostalCode:{' '}
                                          {food.deliveryInfo.postalCode}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                )}
                              <div
                                className="flex w-full h-full bg-orange-200 shadow-md rounded-md p-5 gap-4 cursor-pointer shadow-orange-500"
                                onClick={() =>
                                  paymentToggler(orders.orders.indexOf(food))
                                }
                              >
                                <FcMoneyTransfer className="text-5xl text-orange-500 shadow-md shadow-green-300 rounded-lg" />
                                <div className="flex flex-col justify-center">
                                  <div className="flex items-center gap-1">
                                    <p className="tracking-wide text-lg">
                                      Payment Info Received
                                    </p>

                                    <TiTick className="text-green-600 text-2xl" />
                                  </div>
                                  {!paymentToggle ? (
                                    <span className="text-sm text-left">
                                      (Click To Expand)
                                    </span>
                                  ) : (
                                    <span className="text-sm text-left">
                                      (Click To Minimize)
                                    </span>
                                  )}
                                </div>
                              </div>
                              {!paymentToggle && (
                                <div className="w-full flex items-center justify-center">
                                  <div className="w-[4px] h-16 bg-green-500 flex items-center justify-center" />
                                </div>
                              )}
                              {paymentIndex === orders.orders.indexOf(food) &&
                                paymentToggle && (
                                  <div className="bg-gradient-to-r from-orange-200 to-orange-300 mt-1 rounded-lg">
                                    <h1 className="text-3xl font-semibold py-4 px-7 rounded-md bg-gray-400 bg-opacity-30">
                                      Payment Information
                                    </h1>
                                    <div className="flex flex-col gap-2 tracking-wider bg-slate-900 bg-opacity-10 text-lg p-5">
                                      <p className="bg-white bg-opacity-20 p-4 rounded-md">
                                        Payment Method : {food.paymentMethod}
                                      </p>
                                      <p className="bg-white bg-opacity-20 p-4 rounded-md">
                                        Payment Mobile Number :{' '}
                                        {food.paymentMobileNumber}
                                      </p>
                                      <p className="bg-white bg-opacity-20 p-4 rounded-md">
                                        Payment Mobile Number :{' '}
                                        {food.referenceNumber}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              <div className="flex w-full h-full bg-orange-200 shadow-md rounded-md p-5 gap-4 cursor-pointer shadow-orange-500">
                                <MdOutlinePayments className="text-5xl text-green-600 shadow-md shadow-red-600 rounded-lg" />
                                <div className="flex flex-col items-center justify-center">
                                  <div className="flex items-center gap-1">
                                    <p className="tracking-wide text-lg">
                                      Payment Info Confirmation
                                    </p>

                                    <p className=" border-2 border-red-600 text-red-600 rounded-md font-semibold px-1">
                                      Pending
                                    </p>
                                  </div>
                                </div>
                              </div>{' '}
                              <div className="w-full flex items-center justify-center">
                                <div className="w-[4px] h-16 bg-orange-400 flex items-center justify-center" />
                              </div>
                              <div className="flex w-full h-full bg-orange-200 shadow-md rounded-md p-5 gap-4 cursor-pointer shadow-orange-500">
                                <TbTruckDelivery className="text-5xl text-orange-500 shadow-md shadow-red-600 rounded-lg" />
                                <div className="flex flex-col items-center justify-center">
                                  <div className="flex items-center gap-2">
                                    <p className="tracking-wide text-lg">
                                      Delivery Status
                                    </p>

                                    <p className=" border-2 border-red-600 text-red-600 rounded-md font-semibold px-1">
                                      Pending
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full h-screen flex flex-col">
            <h1 className="w-full h-full text-center semism:text-2xl text-xl font-semibold">
              You Have Not Ordered Anything From Us Yet
            </h1>
            <img
              src={emptyOrder}
              className="w-full h-full object-contain"
              alt="no-order"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
