import { useEffect, useState } from 'react';
import './css/App.css';
import {
  setUserDetail,
  selectUserDetails,
} from './reduxStore/reducers/userDetailSlice';
import { useAppSelector, useAppDispatch } from './reduxStore/hooks';
import { Login } from "./common/Login"
import authService from './services/authService';
import { Toaster } from 'react-hot-toast';
import Home from './common/Home';
import userService from './services/userService';
import { selectSystemVariables, setSystemVariable, systemVariables } from './reduxStore/reducers/systemVariables';

export default function App() {

  const userDetail = useAppSelector(selectUserDetails);
  const SystemVariables = useAppSelector(selectSystemVariables);
  const dispatch = useAppDispatch();
  const [role, setRole] = useState("");

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

  // useEffect(() => {
  //   console.log("SystemVariables : ", SystemVariables);
  // }, [SystemVariables]);

  // as the userDetail is set, it sets the role of the user based on the same
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

  return (<>
    <div><Toaster position="top-center" reverseOrder={false} /></div>
    {Object.values(SystemVariables.ROLES).includes(role) ? <Home /> : <Login />}
  </>);
}


