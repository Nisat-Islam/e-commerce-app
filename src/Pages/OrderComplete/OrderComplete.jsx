import React from 'react';
import { Link } from 'react-router-dom';

const OrderComplete = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-tr from-gray-100 to-gray-200 flex justify-center">
      <div className="flex flex-col md:p-2 gap-4 text-center mt-7">
        <h2 className="text-4xl font-semibold text-orange-400">
          Congratulations
        </h2>
        <h2 className="text-4xl font-semibold text-gray-800">
          Your Order Has Been Received
        </h2>
        <p className="text-lg">
          Hi, thank you for shopping with us. We have received your order. Our
          representative will contact with you shortly.{' '}
        </p>
        <Link to="/orders">
          <button className="bg-gradient-to-tr from-orange-300 to-orange-400 p-3 mt-3 rounded-md font-semibold text-lg text-gray-800">
            View Your Orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete;
