import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../reduxStore/hooks";
import routes, { HEAD_ROUTES, STD_USER_ROUTES } from "../services/routes";
import {
  setUserDetail,
  selectUserDetails,
} from "../reduxStore/reducers/userDetailSlice";
import { setSystemVariable } from "../reduxStore/reducers/systemVariables.jsx";
import { selectSystemVariables } from "../reduxStore/reducers/systemVariables.jsx";
import "../css//Home.css";
import Navbar from "./Navbar";
import AdminSidebar from "../adminComponents/Sidebar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-hot-toast";
import { Login } from "./Login";
import userService from "../services/userService";
import authService from "../services/authService";

export default function Home() {
  const SystemVariables = useAppSelector(selectSystemVariables);
  const userDetail = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("userDetails : ", userDetail);
    if (userDetail._id == "id") {
      return;
    }
    if (!userDetail.isProfile) {
      navigate("/editProfile");
    }
    console.log("approve status : ", userDetail.isApproved);
    if (!userDetail.isApproved) {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
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
                className="w-full border border-transparent rounded-none rounded-r-lg  flex items-center justify-center text-sm font-medium text-green-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),
        { duration: 200000 }
      );
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

    userService
      .getUserProfile(authService.getCurrentUserId())
      .then((res) => {
        const localUserDetail = authService.getCurrentUser();

        if (localUserDetail.profileImage == res.profile.profileImage) {
          console.log("return without setting profile image");
          return;
        }
        const updatedUserDetail = {
          ...localUserDetail,
          profileImage: res.profile.profileImage,
        };
        console.log("imagePromise then after : ", updatedUserDetail);
        localStorage.setItem("userDetail", JSON.stringify(updatedUserDetail));
        dispatch(setUserDetail(updatedUserDetail));
      })
      .catch((error) => {
        console.log("Home profile error : ", error);
      });

    if (Object.values(SystemVariables.ROLES).includes(userDetail.role)) {
      userService
        .getAllVariables()
        .then((unTypedRes) => {
          const res = unTypedRes;
          console.log(res.variables);
          dispatch(setSystemVariable(res.variables));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userDetail]);

  return (
    <div className="Home">
      {Object.values(SystemVariables.ROLES).includes(userDetail.role) ? (
        <Navbar />
      ) : (
        <></>
      )}

      {userDetail.role == SystemVariables.ROLES.STD_USER ||
      userDetail.role == SystemVariables.ROLES.STAFF ? (
        <div className="NotMyNavbar">
          {Object.values(SystemVariables.ROLES).includes(userDetail.role) ? (
            <Sidebar />
          ) : (
            <></>
          )}
          <div id="MainComponents" className="MainComponents dark:bg-gray-600 ">
            {STD_USER_ROUTES({userDetail})}
          </div>
        </div>
      ) : userDetail.role == SystemVariables.ROLES.HEAD ||
        userDetail.role == SystemVariables.ROLES.SYSTEM_COORDINATOR ? (
        <div className="NotMyNavbar">
          {Object.values(SystemVariables.ROLES).includes(userDetail.role) ? (
            <AdminSidebar />
          ) : (
            <></>
          )}

          <div id="MainComponents" className="MainComponents  dark:bg-gray-600">
            {HEAD_ROUTES({ userDetail })}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
