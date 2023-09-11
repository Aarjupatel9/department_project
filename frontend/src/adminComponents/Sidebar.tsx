import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import "../css/admin.css";

export default function Sidebar() {
    return (
        <aside id="logo-sidebar" className="AppSideBar w-64 h-screen pt-3 transition-transform -translate-x-full bg-gray-300 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            {/* <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar"> */}
            <div className="h-full px-3 pb-4 overflow-y-auto bg-transparent dark:bg-gray-800">
                <ul className="space-y-6 font-medium">
                    <li className="user-list-button"  >
                        <button type="button" className=" flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" id="users">
                                <path d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z"></path>
                            </svg>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Users</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <ul id="dropdown-example" className="sidebar-dropdown-user-list py-2 space-y-2 hidden">
                            <li className='pl-3'>
                                <Link to="/userAccounts/new" className="sidebar-dropdown-user-list-items flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 100 100" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="users">
                                        <path d="M78.2 58.2C81.1 55.8 83 52.1 83 48c0-6.9-5.6-13-12-13s-12 6.1-12 13c0 4.1 1.9 7.8 4.8 10.2-1.3.5-2.5 1-3.7 1.7-3.8-4.5-8.8-8-14.6-9.7C49.9 47.1 53 41.8 53 36c0-9.1-7.5-17-16-17s-16 7.9-16 17c0 5.8 3.1 11.1 7.5 14.2C16.1 53.9 7 65.4 7 79c0 1.1.9 2 2 2h82c1.1 0 2-.9 2-2 0-9.6-6.2-17.8-14.8-20.8zM63 48c0-4.2 3.5-9 8-9s8 4.8 8 9-3.5 9-8 9-8-4.8-8-9zM25 36c0-6.1 5.1-13 12-13s12 6.9 12 13-5.1 13-12 13-12-6.9-12-13zM11.1 77c1-13.4 12.3-24 25.9-24 13.7 0 24.9 10.6 25.9 24H11.1zm55.8 0c-.3-5-1.9-9.8-4.5-13.8C65 61.8 67.9 61 71 61c9.3 0 16.9 7 17.9 16h-22z"></path>
                                        <path d="M1084-790V894H-700V-790h1784m8-8H-708V902h1800V-798z"></path>
                                    </svg>
                                    <span className="ml-3">New registration</span>
                                </Link>
                            </li>
                            <li className='pl-3'>
                                <Link to="/userAccounts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 100 100" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="users">
                                        <path d="M78.2 58.2C81.1 55.8 83 52.1 83 48c0-6.9-5.6-13-12-13s-12 6.1-12 13c0 4.1 1.9 7.8 4.8 10.2-1.3.5-2.5 1-3.7 1.7-3.8-4.5-8.8-8-14.6-9.7C49.9 47.1 53 41.8 53 36c0-9.1-7.5-17-16-17s-16 7.9-16 17c0 5.8 3.1 11.1 7.5 14.2C16.1 53.9 7 65.4 7 79c0 1.1.9 2 2 2h82c1.1 0 2-.9 2-2 0-9.6-6.2-17.8-14.8-20.8zM63 48c0-4.2 3.5-9 8-9s8 4.8 8 9-3.5 9-8 9-8-4.8-8-9zM25 36c0-6.1 5.1-13 12-13s12 6.9 12 13-5.1 13-12 13-12-6.9-12-13zM11.1 77c1-13.4 12.3-24 25.9-24 13.7 0 24.9 10.6 25.9 24H11.1zm55.8 0c-.3-5-1.9-9.8-4.5-13.8C65 61.8 67.9 61 71 61c9.3 0 16.9 7 17.9 16h-22z"></path>
                                        <path d="M1084-790V894H-700V-790h1784m8-8H-708V902h1800V-798z"></path>
                                    </svg>
                                    <span className="ml-3">All Users</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/event" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" id="event-available">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M16 10.53c-.29-.29-.77-.29-1.06 0l-4.35 4.35L9 13.29c-.29-.29-.77-.29-1.06 0-.29.29-.29.77 0 1.06l1.94 1.94c.39.39 1.02.39 1.41 0l4.7-4.7c.3-.29.3-.77.01-1.06zM19 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V8h14v10c0 .55-.45 1-1 1z"></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Events</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Event attended</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="money">
                                <path className="fill-current  dark:text-gray-200" d="M16 17c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"></path>
                                <path className="fill-current  dark:text-gray-200" d="M16.4 13.2h-.8a2.613 2.613 0 0 1-2.493-1.864 1 1 0 1 1 1.918-.565c.075.253.312.43.575.43h.8a.6.6 0 0 0 0-1.201h-.8C14.166 10 13 8.833 13 7.4s1.166-2.6 2.6-2.6h.8c1.121 0 2.111.714 2.466 1.778a1 1 0 1 1-1.897.633.598.598 0 0 0-.569-.411h-.8a.6.6 0 0 0 0 1.2h.8c1.434 0 2.6 1.167 2.6 2.6s-1.166 2.6-2.6 2.6z"></path>
                                <path className="fill-current  dark:text-gray-200" d="M16 6c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18C15.01 5.13 15 5.07 15 5c0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm0 8c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18c-.009-.07-.019-.13-.019-.2 0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm2 17H2a1 1 0 0 1-1-1v-9c0-.265.105-.52.293-.707C1.527 20.058 3.653 18 6 18c1.944 0 4.452 1.469 5.295 2H16a3.004 3.004 0 0 1 2.955 3.519l7.891-3.288a2.995 2.995 0 0 1 2.818.273A2.993 2.993 0 0 1 31 23a1 1 0 0 1-.496.864l-12 7A1.003 1.003 0 0 1 18 31zM3 29h14.729l11.14-6.498a1.01 1.01 0 0 0-.314-.334.984.984 0 0 0-.939-.091l-9.23 3.846A1.007 1.007 0 0 1 18 26h-8a1 1 0 1 1 0-2h6a1.001 1.001 0 0 0 0-2h-5c-.197 0-.391-.059-.555-.167C9.68 21.323 7.387 20 6 20c-1.09 0-2.347.88-3 1.439V29z"></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Grants</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Papers</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Consultancy work</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </aside>)
}
