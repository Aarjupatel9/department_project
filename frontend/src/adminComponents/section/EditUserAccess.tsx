import React, { useEffect, useState } from 'react'
import adminService from '../../services/adminService';
import { Link, useParams } from 'react-router-dom';

import { selectUserDetails, userDetail, userDetailTemplate, userProfile, userProfileTemplate } from '../../reduxStore/reducers/userDetailSlice';
import { UserProfile } from '../../common/UserProfile';
import authService from '../../services/authService';
import { toast } from 'react-hot-toast';
import { User } from './EditUserAccountRequest';
import { useAppSelector } from '../../reduxStore/hooks';
import { selectSystemVariables } from '../../reduxStore/reducers/systemVariables';

export default function EditUserAccess() {

  const SystemVariables = useAppSelector(selectSystemVariables);

  const [userBasicDetail, setUserBasicDetail] = useState<userDetail>(userDetailTemplate);
  const [userProfile, setUserProfile] = useState<userProfile>(userProfileTemplate);
  const [role, setRole] = useState(SystemVariables.ROLES.STD_USER);
  useEffect(() => {
    console.log(userBasicDetail);
  }, [userBasicDetail]);
  const { id } = useParams<{ id: string }>();;

  useEffect(() => {
    console.log("id : ", id);
    adminService.getUserDetails(id).then((res) => {
      const typedRes = res as IGetUserDetailsResponse
      const user = typedRes.user;
      const userProfile = typedRes.profile;

      console.log("users : ", user);
      const usersWithDefaults = {
        ...user,
        VerifiedBy: user.VerifiedBy || "not verified",
      };
      setUserBasicDetail(usersWithDefaults);
      setRole(user.role);
      setUserProfile(userProfile);


    }).catch((error) => {
      console.log("error : ", error);
    })
  }, [id]);

  const verify = () => {
    if (userBasicDetail.isVerified) {
      toast.success("user is already verified");
      return;
    }
    const verifyPromise = adminService.verifyUserAccount(id) as Promise<{ message: string }>;
    verifyPromise.then((res) => {
      setUserBasicDetail((prev) => { return { ...prev, isVerified: true, } })
    })
    toast.promise(
      verifyPromise,
      {
        loading: 'please wait while we update in our system',
        success: (data) => data.message.toString(),
        error: (err) => err.toString(),
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 3000,
          icon: '🔥',
        },
        error: {
          duration: 3000,
          icon: '🔥',
        },
      }
    );
  }

  const approve = () => {
    if (userBasicDetail.isApproved) {
      toast.success("user is already verified");
      return;
    }
    const verifyPromise = adminService.approveUserAccount(id) as Promise<{ message: string }>;
    verifyPromise.then((res) => {
      setUserBasicDetail((prev) => { return { ...prev, isApproved: true, } })
    })
    toast.promise(
      verifyPromise,
      {
        loading: 'please wait while we update in our system',
        success: (data) => data.message.toString(),
        error: (err) => err.toString(),
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 3000,
          icon: '🔥',
        },
        error: {
          duration: 3000,
          icon: '🔥',
        },
      }
    );
  }

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log("role is changed : ", event.target.value);
    setRole(value);
    const data = {
      _id: userBasicDetail._id,
      role: value
    }
    const roleUpdatePromise = adminService.updateUserAccountRole(data) as Promise<{ message: string }>;
    roleUpdatePromise.then((res) => {
      setUserBasicDetail((prev) => { return { ...prev, role: value, } })
    })
    toast.promise(
      roleUpdatePromise,
      {
        loading: 'please wait while we updating Role of user',
        success: (data) => data.message,
        error: (err) => err,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 3000,
          icon: '🔥',
        },
        error: {
          duration: 3000,
          icon: '🔥',
        },
      }
    );
  }


  return (
    <div className="flex flex-col overflow-x-auto shadow-md sm:rounded-lg">
      <form className='m-5 mb-0 pb-0 p-5'>
        <div className="relative z-0 w-full  group">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="w-full mb-6">
              <p className="text-xl font-medium text-gray-500 dark:text-gray-400">Email id</p>
              <p className="text-xl text-gray-900 dark:text-white">{userBasicDetail.email}</p>
            </div>
          </div>
        </div>
      </form> <UserProfile readOnly={true} />

      {userBasicDetail.role != SystemVariables.ROLES.HEAD ?
        <div className="flex flex-row justify-center items-center my-3">
          <div className=" mx-auto ">
            {(authService.getCurrentUserRole() == SystemVariables.ROLES.HEAD || authService.getCurrentUserRole() == SystemVariables.ROLES.SYSTEM_COORDINATOR) ?
              <button type="button" onClick={verify} className="text-white mx-auto bg-red-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{userBasicDetail.isVerified ? "verified" : "verify"}</button> : <></>}
          </div>
          <div className=" mx-auto ">
            {(authService.getCurrentUserRole() == SystemVariables.ROLES.HEAD) ?
              <div className="flex flex-row  justify-center items-center ">
                <label htmlFor="roleOfUser" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role of user</label>
                <select onChange={handleRoleChange} value={role.toString()} name='roleOfUser' id="roleOfUser"
                  className=" py-0  h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {Object.values(SystemVariables.ROLES).map((role, index) => {
                    if (role != SystemVariables.ROLES.HEAD) {
                      return <option key={index} value={role.toString()}>{role}</option>
                    } 
                  })}
                </select>
              </div>
              : <></>}
          </div>
          <div className=" mx-auto">
            {authService.getCurrentUserRole() == SystemVariables.ROLES.HEAD ?
              <button type="button" onClick={approve} className="text-white mx-auto bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{userBasicDetail.isApproved ? "Approved" : "Approve"}</button> : <></>}
          </div>
        </div>
        : <></>}
    </div>


  )
}

export interface IGetUserDetailsResponse {
  user: userDetail
  profile: userProfile
}
