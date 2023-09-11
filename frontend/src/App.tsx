import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './css/App.css';
import {
  userDetailTemplate,
  setUserDetail,
  selectUserDetails,
} from './reduxStore/reducers/userDetailSlice';
import { useAppSelector, useAppDispatch } from './reduxStore/hooks';
import { Login } from "./common/Login"
import authService from './services/authService';
import toast, { Toaster } from 'react-hot-toast';
import Home from './common/Home';
import userService from './services/userService';
import { selectSystemVariables, setSystemVariable, systemVariables } from './reduxStore/reducers/systemVariables';

export default function App() {

  const userDetail = useAppSelector(selectUserDetails);
  const SystemVariables = useAppSelector(selectSystemVariables);
  const dispatch = useAppDispatch();
  const [role, setRole] = useState("");

  useEffect(() => {
    console.log("SystemVariables : ", SystemVariables);
  }, [SystemVariables]);

  useEffect(() => {
    setRole(userDetail.role);
    if (Object.values(SystemVariables.ROLES).includes(userDetail.role)) {
      userService.getAllVariables().then((unTypedRes) => {
        const res = unTypedRes as { success: boolean, variables: systemVariables };
        console.log(res.variables);
        dispatch(setSystemVariable(res.variables));
      }).catch((error) => {
        console.log(error);
      })
    }
  }, [userDetail])

  useEffect(() => {
    const preferTheme = userService.getUserPreferTheme();
    if (preferTheme == "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, []);

  useEffect(() => {
    const localUserDetail = authService.getCurrentUser();
    console.log("localUSerDetails : ", localUserDetail);
    dispatch(setUserDetail(localUserDetail));
  }, [])

  return (<>
    <div><Toaster position="top-center" reverseOrder={false} /></div>
    {Object.values(SystemVariables.ROLES).includes(role) ? <Home /> : <Login />}
  </>);
}


