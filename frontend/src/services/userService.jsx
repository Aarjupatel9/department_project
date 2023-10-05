import authService from "./authService";
import { userProfile } from "../reduxStore/reducers/userDetailSlice";
import { handleRejectResponse } from "./systemService";

import { fetchPostOptions } from "./constants";

class UserService {
  updateProfile(data) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify(data);
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/profile/updateProfile",
        fetchPostOptions
      )
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in updateProfile arrive : ", res);
          if (res.success) {
            resolve(res);
          } else {
            handleRejectResponse(res.message);
            if (typeof res.message == String) {
              reject(res.message);
            } else {
              reject("server error");
            }
          }
        })
        .catch((e) => {
          console.log("error : ", e);
          reject(e.toString());
        });
    });
  }
  getUserProfile(_id) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify({ _id: _id });
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/profile/getProfile",
        fetchPostOptions
      )
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in getNewUserDetails arrive : ", res);
          if (res.success) {
            resolve(res);
          } else {
            handleRejectResponse(res.message);
            if (typeof res.message == String) {
              reject(res.message);
            } else {
              reject("server error");
            }
          }
        })
        .catch((e) => {
          console.log("error : ", e);
          reject(e.toString());
        });
    });
  }
  uploadUserProfileImage(formData) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = formData;
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/profile/upload-Profile-Image",
        fetchPostOptions
      )
        .then((response) => {
          console.log(
            "uploadUserProfileImage || fetch then response :",
            response
          );
          return response.json();
        })
        .then((res) => {
          console.log("uploadUserProfileImage ||response in arrive : ", res);
          if (res.success) {
            resolve(res);
          } else {
            handleRejectResponse(res.message);
            if (typeof res.message == String) {
              reject(res.message);
            } else {
              reject("server error");
            }
          }
        })
        .catch((e) => {
          console.log("error : ", e);
          reject(e.toString());
        });
    });
  }

  getAllVariables() {
    return new Promise(function (resolve, reject) {
      fetch(process.env.REACT_APP_API_SERVER + "/api/system/getAllVariables")
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in getNewUserDetails arrive : ", res);
          if (res.success) {
            resolve(res);
          } else {
            handleRejectResponse(res.message);
            if (typeof res.message == String) {
              reject(res.message);
            } else {
              reject("server error");
            }
          }
        })
        .catch((e) => {
          console.log("error : ", e);
          reject(e.toString());
        });
    });
  }
  getUserPreferTheme() {
    const localData = localStorage.getItem("getUserPreferTheme");
    if (localData == null) {
      return "white";
    }
    return JSON.parse(localData);
  }
  saveUserPreferTheme(themeName) {
    localStorage.setItem("getUserPreferTheme", JSON.stringify(themeName));
  }
}

export default new UserService();
