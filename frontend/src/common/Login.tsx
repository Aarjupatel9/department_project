import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../reduxStore/hooks';
import {
  setUserDetail,
  selectUserDetails, userDetailTemplate, userDetail, userProfile
} from '../reduxStore/reducers/userDetailSlice';

import { userLoginValidator, userSignUpValidator } from "../validator/authValidator"
import toast from 'react-hot-toast';
import "../css/login.css";
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

export function Login() {

  const userDetail = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resendEnable, setResendEnable] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();


  function handleLogin() {
    var cred = {
      email: email,
      password: password
    };
    const { error } = userSignUpValidator.validate(cred);
    console.log("validation error : ", error);
    if (error) {
      toast.error(error.toString());
      return;
    }

    const loginPromise = authService.login(cred) as Promise<{ message: string }>;
    toast.promise(
      loginPromise,
      {
        loading: 'please wait while we verify you',
        success: (data) => data.message,
        error: (err) => {
          return err;
        }
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 6000,
          icon: '🔥',
        },
        error: {
          duration: 6000,
          icon: '🔥',
        },
      }
    );

    loginPromise.then((unTypedRes) => {
      const response = unTypedRes as { userProfile: userProfile, user: userDetail, message: string };
      if (response.userProfile) {
        response.user.isProfile = true;
      } else {
        response.user.isProfile = false;
      }
      localStorage.setItem("userDetail", JSON.stringify(response.user));
      dispatch(setUserDetail(response.user));
    }).catch((message) => {
      console.error(message);

      if (message == "Verification email is already send, please verify your email by click on the given Link in Mail") {
        setResendEnable(true);
      }
    })

  }
  function handleRegister() {
    var cred = {
      email: email,
      password: password
    };
    const { error } = userSignUpValidator.validate(cred);
    console.log("validation error : ", error);
    if (error) {
      toast.error(error.toString());
      return;
    } if (password != confirmPassword) {
      toast.error("both password must be same");
      return;
    }

    const registerPromise = authService.register(cred) as Promise<{ message: string }>;
    toast.promise(
      registerPromise,
      {
        loading: 'please wait while we register in our system',
        success: (data) => { return "Registerd Successfully, please go to your inbox and verify your email to proceed further"; },
        error: (err) => err,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 6000,
          icon: '🔥',
        },
        error: {
          duration: 6000,
          icon: '🔥',
        },
      }
    );
    registerPromise.then((response) => {
      console.log("Register promise: ", response);
      navigate('/verifyemail');
    }).catch((error) => {
    })
  }

  function registerRedirect() {
    setIsLogin(!isLogin);
  }


  function resendVerificationLink() {
    var cred = {
      email: email,
      password: password
    };
    const { error } = userSignUpValidator.validate(cred);
    console.log("validation error : ", error);
    if (error) {
      toast.error(error.toString());
      return;
    }

    const resendEmailVerificationLinkPromise = authService.resendVerificationLink(cred) as Promise<{ message: string }>;
    toast.promise(
      resendEmailVerificationLinkPromise,
      {
        loading: 'please wait while we sending verification link',
        success: (data) => data.message,
        error: (err) => err,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 6000,
          icon: '🔥',
        },
        error: {
          duration: 6000,
          icon: '🔥',
        },
      }
    );
    resendEmailVerificationLinkPromise.then((response) => {
      // toast.success(response.message);
    }).catch((error) => {
      // toast.error(error);
    })
  }

  return (
    <div className='login dark:bg-gray-700 flex items-center justify-center'>

      {isLogin ?
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">log in to Department management system </h5>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value); }} placeholder="xyz@gmail.com" id="loginEmail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value); }} id="loginPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div className="flex items-start">
              <a href="#" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
            </div>
            <button type="button" onClick={() => { handleLogin(); }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered? <a onClick={() => { registerRedirect(); }} className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
            </div>
            {resendEnable ?
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                resend verification link expired? <a onClick={() => { resendVerificationLink(); }} className="text-blue-700 hover:underline dark:text-blue-500">resend verification link</a>
              </div> : <></>}

          </form>
        </div>
        : <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign up to Department management system</h5>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
              <input type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value); }} placeholder="xyz@gmail.com" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
              <input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value); }} id="password" placeholder="••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">confirm password</label>
              <input type="password" name="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); }} id="password" placeholder="••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>


            <button type="button" onClick={() => { handleRegister(); }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              already register? <a onClick={() => { registerRedirect(); }} className="text-blue-700 hover:underline dark:text-blue-500">login</a>
            </div>
          </form>
        </div>}

    </div>
  );
}


export interface loginCredentials {
  email: string
  password: string
  roll: string
}