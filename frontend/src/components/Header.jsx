import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1 join'>
        <Link className='btn text-xl join-item' to='/'>
          Home
        </Link>
        <Link className='btn text-xl join-item' to='/items'>
          Items
        </Link>
        <Link className='btn text-xl join-item' to='/collections'>
          Collections
        </Link>
        {userInfo && (
          <>
            <Link className='btn text-xl join-item' to='/collections/add'>
              Create Collection
            </Link>
          </>
        )}
        <div className='form-control'>
          <input
            type='text'
            placeholder='Search'
            className='input input-bordered w-24 md:w-auto join-item'
          />
        </div>
      </div>

      <div className='flex-none gap-2'>
        {!userInfo && (
          <>
            <Link className='justify-between btn' to='/login'>
              Login
            </Link>
          </>
        )}
        {userInfo && (
          <div className='join'>
            {" "}
            <Link className='btn text-xl join-item' to='/profile'>
              {userInfo.name}
            </Link>
            <button
              type='button'
              className='btn join-item  text-xl'
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
