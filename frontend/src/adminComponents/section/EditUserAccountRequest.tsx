import React, { useEffect, useState } from 'react'
import adminService from '../../services/adminService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userDetail, userDetailTemplate } from '../../reduxStore/reducers/userDetailSlice';


export default function EditUserAccountRequest() {

  const [searchInput, setSearchInput] = useState("");
  const [newUsers, setNewUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(newUsers);
    setSearchInput("");
    setFilterList("");
  }, [newUsers]);

  useEffect(() => {

  }, []);

  const [userBasicDetail, setUserBasicDetail] = useState<userDetail>(userDetailTemplate);
  useEffect(() => {
    console.log(userBasicDetail);
  }, [userBasicDetail]);
  const { id } = useParams<{ id: string }>();;

  useEffect(() => {
    console.log("id : ", id);
    if (id == "new") {
      adminService.getNewUserDetails().then((unTypedUsers) => {
        const users = unTypedUsers as User[];
        console.log("users : ", users);
        const usersWithDefaults = users.map((user: User) => ({
          ...user,
          verifiedBy: user.verifiedBy || "not verified",
        }));
        setNewUsers(usersWithDefaults);
      }).catch((error) => {
        console.log("error : ", error);
      })
    } else {
      adminService.getAllUserDetails().then((unTypedUsers) => {
        const users = unTypedUsers as User[];
        console.log("users : ", users);
        const usersWithDefaults = users.map((user: User) => ({
          ...user,
          verifiedBy: user.verifiedBy || "not verified",
        }));
        setNewUsers(usersWithDefaults);
      }).catch((error) => {
        console.log("error : ", error);
      })
    }
  }, [id]);

  function setFilterList(input:String) {
    const tmp = newUsers.filter((user) => {
      return user;
    })

    setFilteredUsers(tmp);
  }

  return (
    <div>
      <nav className="bg-gray-300 border-gray-200 dark:bg-gray-900">
        <div className="flex  flex-wrap items-center justify-end mx-auto px-3 py-1">
          <div className="flex md:order-2">
            
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input value={searchInput} onChange={(e) => { setFilterList(e.target.value); setSearchInput(e.target.value); }} type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
          </div>

        </div>
      </nav>
      <div className='flex flex-col pt-4 '>
        <h1 className='mx-auto  text-2xl font-medium text-gray-900 dark:text-white' >Pending Account details</h1>
        <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
              <tr className='mb-2 border-b border-gray-200 dark:border-gray-600'>
                <th scope="col" className="px-6 py-3 bg-gray-100 dark:bg-gray-800">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 dark:text-white dark:bg-gray-700">
                  Verified status
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-100 dark:bg-gray-800">
                  Verified by
                </th>
                <th scope="col" className="px-6 py-3 dark:text-white dark:bg-gray-700">
                  Roll
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-100 dark:bg-gray-800">
                  Approved
                </th>
                <th scope="col" className="px-6 py-3 dark:text-white dark:bg-gray-700">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {filteredUsers.map((user) => {
                return (
                  <tr key={user._id} className="border-b border-gray-200 dark:border-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                      {user.email}
                    </th>
                    <td className="px-6 py-4 dark:text-white dark:bg-gray-700">
                      {user.isVerified ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 bg-gray-100 dark:bg-gray-800">
                      {user.verifiedBy}
                    </td>
                    <td className="px-6 py-4 dark:text-white dark:bg-gray-700">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 bg-gray-100 dark:bg-gray-800">
                      {user.isApproved ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 text-right dark:text-white dark:bg-gray-700">
                      <div onClick={() => { navigate("/editUserAccess/" + user._id); }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</div>
                    </td>
                  </tr>)
              })
              }

            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export interface User {
  isApproved: boolean
  isEmailVerified: boolean
  isVerified: boolean
  verifiedBy: string | "not verified"
  role: string
  __v: number
  _id: string
  email: string;
}