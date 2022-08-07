import React, { useEffect, useState } from 'react';

import useLogin from '../../Hooks/useLogin';

const Login = () => {
  const { userLogin, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgField, setMsgField] = useState(false);
  const [msg, setMsg] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg('Please fill all fields');
    } else {
      userLogin(email, password);
    }
  };
  useEffect(() => {
    !email || !password ? setMsgField(true) : setMsgField(false);
  }, [email, password]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-tr from-orange-300 to-orange-400">
      <form
        className=" flex flex-col mt-5 rounded-tl-3xl rounded-br-3xl rounded-tr-md  rounded-bl-md border-2 border-orange-400  shadow-slate-900 p-[50px] justify-center shadow-lg  shadow-grey bg-gradient-to-r from-slate-800 to-slate-900"
        onSubmit={submitHandler}
      >
        <h1 className="flex items-center gap-1 text-4xl font-bold text-orange-400">
          {' '}
          Login
        </h1>
        <div>
          <label className="text-orange-400 mt-3 mb-5 flex flex-col gap-2 text-[1rem] font-semibold tracking-wide">
            Email : <br />
            <input
              type="email"
              className="rounded-[4px] flex items-center justify-center h-[28px] w-[200px] border-none outline-none bg-gradient-to-tr from-slate-800 to-slate-700 p-3 py-[18px] tracking-wider text-gray-200"
              placeholder="email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="text-orange-400 mt-3 mb-5 flex flex-col gap-2 text-[1rem] font-semibold tracking-wide">
            password: <br />
            <input
              type="password"
              className="rounded-[4px] flex items-center justify-center h-[28px] w-[200px] border-none outline-none bg-gradient-to-tr from-slate-800 to-slate-700 p-3 py-[18px] tracking-wider text-gray-200"
              placeholder="password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {msgField && <p className="text-red-600">{msg}</p>}
        <button
          className="w-[80px] p-2 
          bg-gradient-to-tr from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400 
        border border-slate-800 shadow-sm shadow-orange-300
          rounded-lg  hover:cursor-pointer
           transition-all duration-150 
           ease-in-out font-semibold text-slate-900"
        >
          Login
        </button>
        <p className="text-red-600 mt-2">{error}</p>
      </form>
    </div>
  );
};

export default Login;
