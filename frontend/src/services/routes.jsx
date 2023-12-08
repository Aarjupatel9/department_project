import { Routes, Route } from "react-router-dom";
import Navbar from "../common/Navbar";
import AdminSidebar from "../adminComponents/Sidebar";
import Publication from "../common/Publications";
import AddPublication from "../common/AddPublication";
import Sidebar from "../components/Sidebar";
import TmpCpm from "../common/TmpCpm";
import Filters from "../common/Filters";
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
import NormalEventView from "../common/NormalEventView";
import NormalQualificationView from "../common/NormalQualificationView";
import NormalAchievementView from "../common/NormalAchievementView";
import NormalPublicationView from "../common/NormalPublicationView";
import GenerateReport from "../adminComponents/GenerateReport";
import SystemCoordinatorEventView from "../adminComponents/SystemCoordinatorEventView";
import AddPatent from "../common/AddPatent";
import Patent from "../common/patent";
import NormalPatentView from "../common/NormalPatentView";
import Guide from "../common/Guide";
import AddGuide from "../common/AddGuide";
import NormalGuideView from "../common/NormalGuideView";

const commonRoutes = (
  <>
    <Route path="/qualification" element={<Qualification />} />
    <Route path="/addQualification" element={<AddQualification />} />
    <Route path="/editQualification/:id" element={<AddQualification />} />
    <Route
      path="/qualificationview/:id"
      element={<NormalQualificationView />}
    />

    <Route path="/achievement" element={<Achievement />} />
    <Route path="/addAchievement" element={<AddAchievement />} />
    <Route path="/editAchievement/:id" element={<AddAchievement />} />
    <Route path="/achievementview/:id" element={<NormalAchievementView />} />

    <Route path="/publication" element={<Publication />} />
    <Route path="/addPublication" element={<AddPublication />} />
    <Route path="/editPublication/:id" element={<AddPublication />} />
    <Route path="/publicationview/:id" element={<NormalPublicationView />} />

    <Route path="/event" element={<Events />} />
    <Route path="/addEvent" element={<AddEvents />} />
    <Route path="/editEvent/:id" element={<AddEvents />} />
    <Route path="/eventview/:id" element={<NormalEventView />} />
    <Route path="/filters" element={<Filters />} />
    <Route path="/patent" element={<Patent />} />
    <Route path="/addPatent" element={<AddPatent />} />
    <Route path="/editPatent/:id" element={<AddPatent />} />
    <Route path="/patentview/:id" element={<NormalPatentView />} />

    <Route path="/guide" element={<Guide />} />
    <Route path="/addGuide" element={<AddGuide />} />
    <Route path="/editGuide/:id" element={<AddGuide />} />
    <Route path="/guideview/:id" element={<NormalGuideView />} />
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
      <Route path="/generateReport" element={<GenerateReport />} /> //new
      <Route
        path="/systemCoordinatorEventView"
        element={<SystemCoordinatorEventView />}
      />
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
          {commonRoutes}

          {/* 
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
            <Route path="/editEvent/:id" element={<AddEvents />} /> */}

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
