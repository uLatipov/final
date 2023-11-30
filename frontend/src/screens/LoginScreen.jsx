import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    const response = await login(data);

    if (!response.error) {
      dispatch(setCredentials(response.data));
      navigate("/");
    }
  };

  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto rounded-md shadow-md lg:max-w-xl'>
        {error && (
          <Alert
            mode='error'
            text={error?.data?.message || "Error occured when processing login"}
          />
        )}
        {isLoading && <Loader />}
        <h1 className='text-3xl font-semibold text-center text-white underline'>
          Sign in
        </h1>
        <form className='mt-6' onSubmit={handleLoginSubmit}>
          <div className='mb-2'>
            <p className='block text-sm font-semibold text-gray-200'>Email</p>
            <input
              type='email'
              required
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-black border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <p className='block text-sm font-semibold text-gray-200'>
              Password
            </p>
            <input
              type='password'
              required
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-black border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='mt-6'>
            <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'>
              Login
            </button>
          </div>
        </form>

        <p className='mt-8 text-xs font-light text-center text-white-700'>
          {" "}
          Don't have an account?{" "}
          <Link
            to='/register'
            className='font-medium text-purple-600 hover:underline'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
