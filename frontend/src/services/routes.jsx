import { Routes, Route } from "react-router-dom";
import Navbar from "../common/Navbar";
import AdminSidebar from "../adminComponents/Sidebar";
import Publication from "../common/Publications";
import AddPublication from "../common/AddPublication";
import Sidebar from "../components/Sidebar";
import TmpCpm from "../common/TmpCpm";
import { UserProfile } from "../common/UserProfile";
import EditUserAccountRequest from "../adminComponents/section/EditUserAccountRequest";
import EditUserAccess from "../adminComponents/section/EditUserAccess";
import EditUserProfile from "../common/EditUserProfile";
import { Setting } from "../common/Setting";
import Events from "../common/Events";
import AddEvents from "../common/AddEvents";
import AddQualification from "../common/AddQualification";
import Qualification from "../common/Qualification";
import Achievement from "../common/Achievement";
import AddAchievement from "../common/AddAchievement";
import { Login } from "../common/Login";
// const ROLES = {
//   HEAD: "head",
//   SYSTEM_COORDINATOR: "system coordinator",
//   STAFF: "staff",
//   STD_USER: "standard user",
// };
// const routes = [
//   {
//     role: ROLES.HEAD,
//     routes: [
//       {
//         path: "/",
//         element: "<TmpCpm/>",
//       },
//       {
//         path: "/qualification",
//         element: "<Qualification/>",
//       },
//       {
//         path: "/addQualification",
//         element: "<AddQualification/>",
//       },
//       {
//         path: "/editQualification/:id",
//         element: "<AddQualification/>",
//       },

//       {
//         path: "/achievement",
//         element: "<Achievement/>",
//       },
//       {
//         path: "/addAchievement",
//         element: "<AddAchievement/>",
//       },
//       {
//         path: "/editAchievement/:id",
//         element: "AddAchievement/>",
//       },

//       {
//         path: "/publication",
//         element: "<Publication/>",
//       },
//       {
//         path: "/addPublication",
//         element: "<AddPublication/>",
//       },
//       {
//         path: "/editPublication/:id",
//         element: "AddPublication/>",
//       },

//       {
//         path: "/event",
//         element: "<Event/>",
//       },
//       {
//         path: "/addEvent",
//         element: "<AddEvent/>",
//       },
//       {
//         path: "/editEvent/:id",
//         element: "AddEvent/>",
//       },

//       {
//         path: "/userAccounts",
//         element: "<EditUserAccountRequest/>",
//       },
//       {
//         path: "/userAccounts/:id",
//         element: "<EditUserAccountRequest/>",
//       },
//       {
//         path: "/editUserAccess/:id",
//         element: "<EditUserAccess/>",
//       },
//       {
//         path: "profile",
//         element: "<UserProfile/>",
//         readOnly: false,
//       },
//       {
//         path: "/settings",
//         element: "<Setting/>",
//       },
//       {
//         path: "/editprofile",
//         element: "<EditUserProfile/>",
//       },
//       {
//         path: "/login",
//         element: "<Login/>",
//       },
//       {
//         path: "*",
//         element: "<EditUserProfile/>",
//         readOnly: false,
//       },
//     ],
//   },
//   {
//     role: ROLES.STAFF,
//     routes: [
//       {
//         path: "/",
//         element: "<TmpCpm/>",
//       },
//       {
//         path: "/profile",
//         element: "<UserProfile/>",
//       },
//       {
//         path: "/event",
//         element: "<Events/>",
//       },
//       {
//         path: "/addevent",
//         element: "<AddEvents/>",
//       },
//       {
//         path: "/settings",
//         element: "<Setting/>",
//       },
//       {
//         path: "/editprofile",
//         element: "<EditUserProfile/>",
//       },
//     ],
//   },
//   {
//     role: ROLES.SYSTEM_COORDINATOR,
//     routes: [
//       {
//         path: "/",
//         element: "<TmpCpm/>",
//       },
//       {
//         path: "/event",
//         element: "<Event/>",
//       },
//       {
//         path: "/addevent",
//         element: "<AddEvent/>",
//       },
//       {
//         path: "/userAccounts",
//         element: "<EditUserAccountRequest/>",
//       },
//       {
//         path: "/userAccounts/:id",
//         element: "<EditUserAccountRequest/>",
//       },
//       {
//         path: "/editUserAccess/:id",
//         element: "<EditUserAccess/>",
//       },
//       {
//         path: "profile",
//         element: "<UserProfile/>",
//       },
//       {
//         path: "/settings",
//         element: "<Setting/>",
//       },
//       {
//         path: "/editprofile",
//         element: "<EditUserProfile/>",
//       },
//     ],
//   },
//   {
//     role: ROLES.STD_USER,
//     routes: [
//       {
//         path: "/",
//         element: "<TmpCpm/>",
//       },
//       {
//         path: "/profile",
//         element: "<UserProfile/>",
//       },
//       {
//         path: "/event",
//         element: "<Events/>",
//       },
//       {
//         path: "/addevent",
//         element: "<AddEvents/>",
//       },
//       {
//         path: "/settings",
//         element: "<Setting/>",
//       },
//       {
//         path: "/editprofile",
//         element: "<EditUserProfile/>",
//       },
//     ],
//   },
// ];





const commonRoutes = (
  <>
    <Route path="/qualification" element={<Qualification />} />
    <Route path="/addQualification" element={<AddQualification />} />
    <Route path="/editQualification/:id" element={<AddQualification />} />
    <Route path="/achievement" element={<Achievement />} />
    <Route path="/addAchievement" element={<AddAchievement />} />
    <Route path="/editAchievement/:id" element={<AddAchievement />} />

    <Route path="/publication" element={<Publication />} />
    <Route path="/addPublication" element={<AddPublication />} />
    <Route path="/editPublication/:id" element={<AddPublication />} />
    <Route path="/event" element={<Events />} />
    <Route path="/addEvent" element={<AddEvents />} />
    <Route path="/editEvent/:id" element={<AddEvents />} />
  </>
);
export const HEAD_ROUTES = (props) => {
  
    return (
      <Routes>
        {props.userDetail.isProfile && props.userDetail.isApproved ? (
          <>
            <Route path="/" element={<TmpCpm />} />
            {commonRoutes}

            {/* admin specific routes */}
            <Route path="/userAccounts" element={<EditUserAccountRequest />} />
            <Route
              path="/userAccounts/:id"
              element={<EditUserAccountRequest />}
            />
            <Route path="/editUserAccess/:id" element={<EditUserAccess />} />
          </>
        ) : (
          <></>
        )}
        \
        <Route path="/profile" element={<UserProfile readOnly={false} />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/editProfile" element={<EditUserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<UserProfile readOnly={false} />} />
      </Routes>
    );

};

export const STD_USER_ROUTES = (props) => {

    return (
      <Routes>
        {props.userDetail.isProfile && props.userDetail.isApproved ? (
          <>
            <Route path="/" element={<TmpCpm />} />

            <Route path="/qualification" element={<Qualification />} />
            <Route path="/addQualification" element={<AddQualification />} />
            <Route
              path="/editQualification/:id"
              element={<AddQualification />}
            />

            <Route path="/achievement" element={<Achievement />} />
            <Route path="/addAchievement" element={<AddAchievement />} />
            <Route path="/editAchievement/:id" element={<AddAchievement />} />

            <Route path="/publication" element={<Publication />} />
            <Route path="/addPublication" element={<AddPublication />} />
            <Route path="/editPublication/:id" element={<AddPublication />} />
            <Route path="/event" element={<Events />} />
            <Route path="/addEvent" element={<AddEvents />} />
            <Route path="/editEvent/:id" element={<AddEvents />} />

            <Route path="/profile" element={<UserProfile readOnly={false} />} />
          </>
        ) : (
          <></>
        )}
        <Route path="/settings" element={<Setting />} />
        <Route path="/editProfile" element={<EditUserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<UserProfile readOnly={false} />} />
      </Routes>
    );

};
