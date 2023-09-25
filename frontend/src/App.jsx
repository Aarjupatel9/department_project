import { useEffect, useState } from 'react';
import './css/App.css';
import {
  setUserDetail,
  selectUserDetails,
} from './reduxStore/reducers/userDetailSlice';
import { useAppSelector, useAppDispatch } from './reduxStore/hooks';
import { Login } from "./common/Login.jsx"
import authService from './services/authService';
import { Toaster } from 'react-hot-toast';
import Home from './common/Home';
import userService from './services/userService';
import { selectSystemVariables, setSystemVariable, systemVariables } from './reduxStore/reducers/systemVariables.jsx';
import { defaultUserProfileImage } from './services/constants';
import { useNavigate } from 'react-router-dom';
export default function App() {

  const userDetail = useAppSelector(selectUserDetails);
  const SystemVariables = useAppSelector(selectSystemVariables);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Theme selector 
  useEffect(() => {
    const preferTheme = userService.getUserPreferTheme();
    if (preferTheme == "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }

  }, []);

  // Fetches the user detail from the authservice, if the user is null it sets some default values which are hard coded as a template and sets those details as the UserDetail
  useEffect(() => {
    const localUserDetail = authService.getCurrentUser();
    console.log("localUSerDetails : ", localUserDetail);
    dispatch(setUserDetail(localUserDetail));


  }, [])


  return (<>
    <div><Toaster position="top-center" reverseOrder={false} /></div>
    {/* {Object.values(SystemVariables.ROLES).includes(userDetail.role) ? <Home /> : <Login />} */}
    <Home />
  </>);
}


