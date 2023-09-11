import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../reduxStore/hooks';
import {
  setUserDetail,
  selectUserDetails, userDetailTemplate, userProfile, userProfileTemplate
} from '../reduxStore/reducers/userDetailSlice';
import { Link, useParams } from 'react-router-dom';
import "../css/login.css";
import userService from '../services/userService';
import authService from '../services/authService';
interface UserProfileProps {
  readOnly: boolean;
}
export const UserProfile: React.FC<UserProfileProps> = ({ readOnly }) => {


  const userDetail = useAppSelector(selectUserDetails);

  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState<userProfile>(userProfileTemplate);

  useEffect(() => {

  }, []);


  const { id } = useParams<{ id: string }>();;

  useEffect(() => {
    console.log("id : ", id);
    if (id) {
      userService.getUserProfile(id).then((unTypedRes) => {
        const res = unTypedRes as { profile: userProfile };
        const userProfile = res.profile;
        console.log("userProfile : ", userProfile);
        if (userProfile) {
          setUserProfile(userProfile);
        }
      }).catch((error) => {
        console.log("error : ", error);
      })
    } else {
      userService.getUserProfile(authService.getCurrentUserId()).then((unTypedRes) => {
        const res = unTypedRes as { profile: userProfile };
        const userProfile = res.profile;
        console.log("userProfile : ", userProfile);
        if (userProfile) {
          setUserProfile(userProfile);
        }
      }).catch((error) => {
        console.log("error : ", error);
      })
    }
  }, [id]);

  return (

    <div className="">
      {!readOnly ?
        <nav className="bg-gray-300 border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap   items-center justify-end mx-auto px-3 py-1">
            <div className="flex md:order-2  p-2">
              <ul className="flex flex-col  font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li className=''>
                  <Link to={"/editProfile"} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Update Profile</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> : <></>}
      {userProfile != userProfileTemplate ? (

        <div className={`flex px-2 flex-col mt-5 ${readOnly ? "" : "shadow-md sm:rounded-lg"}`}>
          <h1 className="text-3xl mx-auto font-medium text-gray-900 dark:text-white">Profile</h1>
          <hr className="my-2" />
          <div className="m-1 p-5 flex flex-col">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">First name</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.firstName}</p>
              </div>
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last name</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.lastName}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone number</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.personalDetails.mobileNo}</p>
              </div>
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee ID</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.personalDetails.employeeId}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bank name</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.bankDetails.bankName}</p>
              </div>
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Branch name</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.bankDetails.branch}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">City</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.address.city}</p>
              </div>
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">State</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.address.state}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Designation</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.designation}</p>
              </div>
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Joining Date</p>
                <p className="text-sm text-gray-900 dark:text-white">{String(userProfile.joiningDate)}</p>
              </div>
            </div>

            <div className="w-full mb-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience (in years)</p>
              <p className="text-sm text-gray-900 dark:text-white">{String(userProfile.experience)}</p>
            </div>
          </div>
        </div>


      ) : (
        <div className={`flex flex-col m-3 p-3 ${readOnly ? "" : "shadow-md sm:rounded-lg"}`}>
          <h3 className="text-3xl mx-auto font-medium text-red-900 dark:text-white">{readOnly ? "Profile details is not filled up by user" : "Please update profile details"}</h3>
        </div>)}
    </div>

  );
}


export interface loginCredentials {
  email: string
  password: string
  roll: string
}