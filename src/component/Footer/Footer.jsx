import React from 'react';

import { GrTwitter, GrLinkedin, GrFacebook } from 'react-icons/gr';
import { FcAndroidOs } from 'react-icons/fc';
import { MdPhoneIphone } from 'react-icons/md';
const Footer = () => {
  return (
    <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-900">
      <div className="flex sm:flex-row flex-col px-0 sm:px-5 justify-center gap-10  p-10 sm:text-left text-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold text-orange-400 tracking-wide">
            Follow Us
          </h1>
          <div className="flex gap-2 sm:text-left sm:justify-start justify-center">
            <p className="cursor-pointer text-2xl">
              <GrFacebook className="bg-white text-blue-800" />
            </p>
            <p className="cursor-pointer text-2xl">
              <GrTwitter className="text-blue-500" />
            </p>
            <p className="cursor-pointer text-2xl">
              <GrLinkedin className="text-blue-500 bg-white" />
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-lg text-orange-400 font-semibold">About us</h1>
          <p className="cursor-pointer text-white tracking-wide">Our Sellers</p>
          <p className="cursor-pointer text-white tracking-wide">Our Company</p>
        </div>
        <div>
          <h1 className="text-lg text-orange-400 font-semibold">
            Customer Services
          </h1>
          <p className="cursor-pointer text-white tracking-wide">
            {' '}
            Help Center
          </p>
          <p className="cursor-pointer text-white tracking-wide">
            Report Abuse
          </p>
          <p className="cursor-pointer text-white tracking-wide">
            Submit a Dispute
          </p>
          <p className="cursor-pointer text-white tracking-wide">
            Policies & Rules
          </p>
        </div>{' '}
        <div>
          <h1 className="text-lg text-orange-400 font-semibold">
            Become A Reseller
          </h1>
          <p className="cursor-pointer text-white tracking-wide">
            {' '}
            Reseller Membership
          </p>
          <p className="cursor-pointer text-white tracking-wide">
            How To Resell
          </p>

          <p className="cursor-pointer text-white tracking-wide">
            Affilliate Program
          </p>
        </div>
        <div>
          <h1 className="text-lg text-orange-400 font-semibold">
            Download Our App
          </h1>
          <p className="cursor-pointer text-white tracking-wide flex items-center justify-center bg-slate-800 p-2 rounded-md mb-2">
            Android <FcAndroidOs className="text-4xl" />
          </p>
          <p className="cursor-pointer text-white tracking-wide flex items-center justify-center bg-slate-800 p-2 rounded-md">
            Iphone <MdPhoneIphone className="text-4xl text-black" />
          </p>
        </div>
      </div>
      <p className=" text-orange-400 text-center pb-5">
        © 2022 e-commerce. All rights reserved.
      </p>
      <p className="text-orange-500 brightness-150 font-semibold tracking-wider text-center">
        Developed By Nisad Tushar
      </p>
    </div>
  );
};

export default Footer;
