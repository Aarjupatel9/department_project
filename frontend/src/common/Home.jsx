import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../reduxStore/hooks';
import routes from "../services/routes";
import {
    setUserDetail,
    selectUserDetails, userDetailTemplate
} from '../reduxStore/reducers/userDetailSlice';
import { setSystemVariable } from '../reduxStore/reducers/systemVariables.jsx';
import "../css//Home.css";
import Navbar from './Navbar'
import AdminSidebar from '../adminComponents/Sidebar'
import Paper from "./Paper";
import AddPaper from "./AddPaper";
import Sidebar from '../components/Sidebar'
import TmpCpm from './TmpCpm'
import { UserProfile } from './UserProfile'
import EditUserAccountRequest from '../adminComponents/section/EditUserAccountRequest'
import EditUserAccess from '../adminComponents/section/EditUserAccess'
import EditUserProfile from './EditUserProfile'
import { toast } from 'react-hot-toast';
import { Setting } from './Setting';
import Events from './Events';
import { selectSystemVariables } from '../reduxStore/reducers/systemVariables.jsx';
import EmailVerifier from '../components/EmailVerifier';
import AddEvents from './AddEvents';
import { Login } from './Login';
import userService from '../services/userService';

export default function Home() {
    const SystemVariables = useAppSelector(selectSystemVariables);
    const userDetail = useAppSelector(selectUserDetails);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        console.log("userDetails : ", userDetail)
        if (userDetail._id == "id") {
            return;
        }
        if (!userDetail.isProfile) {
            navigate("/editProfile");
        }
        console.log("approve status : ", userDetail.isApproved);
        if (!userDetail.isApproved) {
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm text-red-900 font-medium">
                                    Please wait for admit to approve your account
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l p-2 border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg  flex items-center justify-center text-sm font-medium text-green-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 200000 });
        }
    }, []);


    useEffect(() => {
        console.log("userDetails changed : ", userDetail);
        if (userDetail._id == "id") {
            return;
        }
        if (userDetail._id === "id") {
            console.log("enter in /login redirect");
            navigate("/login");
            return;
        }

        if (Object.values(SystemVariables.ROLES).includes(userDetail.role)) {
            userService.getAllVariables().then((unTypedRes) => {
                const res = unTypedRes;
                console.log(res.variables);
                dispatch(setSystemVariable(res.variables));
            }).catch((error) => {
                console.log(error);
            })
        }

    }, [userDetail])

    return (
        <div className='Home'>
            {/* <Navbar /> */}
            {/* {
                routes.map((r) => {
                    console.log("r: ", r);
                    console.log("Role: ", userDetail.role);
                    if (r.role === userDetail.role) {
                        return r.routes.map((route) => {
                            return (
                                <>
                                    <Route path={route.path} element={route.element} />
                                </>
                            )
                        });
                    }
                })
            } */}

            {Object.values(SystemVariables.ROLES).includes(userDetail.role) ? <Navbar /> : <></>}


            {userDetail.role == SystemVariables.ROLES.STD_USER || userDetail.role == SystemVariables.ROLES.STAFF ?
                <div className='NotMyNavbar'>

                    {Object.values(SystemVariables.ROLES).includes(userDetail.role) ? <Sidebar /> : <></>}
                    <div className="MainComponents dark:bg-gray-600">
                        <Routes>
                            {userDetail.isProfile && userDetail.isApproved ?
                                <>
                                    <Route path="/" element={<TmpCpm />} />
                                    <Route path="/profile" element={<UserProfile readOnly={false} />} />
                                    <Route path="/event" element={<Events />} />
                                    <Route path="/addEvent" element={<AddEvents />} />
                                </> : <></>}
                            <Route path="/settings" element={<Setting />} />
                            <Route path="/verifyemail" element={<EmailVerifier />} />
                            <Route path="/editProfile" element={<EditUserProfile />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/editEvent/:id" element={<AddEvents />} />
                            <Route path="*" element={<UserProfile readOnly={false} />} />
                        </Routes>
                    </div>
                </div>
                : userDetail.role == SystemVariables.ROLES.HEAD || userDetail.role == SystemVariables.ROLES.SYSTEM_COORDINATOR ?
                    <div className='NotMyNavbar'>
                        {Object.values(SystemVariables.ROLES).includes(userDetail.role) ? <AdminSidebar /> : <></>}

                        <div className="MainComponents  dark:bg-gray-600">
                            <Routes>
                                {userDetail.isProfile && userDetail.isApproved ?
                                    <><Route path="/" element={<TmpCpm />} />
                                        <Route path="/event" element={<Events />} />
                                        <Route path="/paper" element={<Paper />} />
                                        <Route path="/addPaper" element={<AddPaper />} />
                                        <Route path="/addEvent" element={<AddEvents />} />
                                        <Route path="/editEvent/:id" element={<AddEvents />} />
                                        <Route path="/userAccounts" element={<EditUserAccountRequest />} />
                                        <Route path="/userAccounts/:id" element={<EditUserAccountRequest />} />
                                        <Route path="/editUserAccess/:id" element={<EditUserAccess />} />
                                        <Route path="/profile" element={<UserProfile readOnly={false} />} />
                                    </> : <></>}
                                <Route path="/settings" element={<Setting />} />
                                <Route path="/editProfile" element={<EditUserProfile />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="*" element={<UserProfile readOnly={false} />} />
                            </Routes>
                        </div>
                    </div> : <Login />
            }
        </div>
    )
}
