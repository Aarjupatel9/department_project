// import { loginCredentials } from "../common/Login";

import {
  setUserDetail,
  selectUserDetails, userDetailTemplate
} from '../reduxStore/reducers/userDetailSlice';
import { handleRejectResponse } from './systemService';
class AuthService {

  resendVerificationLink(credential: loginCredentials) {
    console.log(credential);
    return new Promise(function (resolve, reject) {
      const options = {
        method: "POST",
        credentials: "include" as RequestCredentials,
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        body: JSON.stringify(credential),
      };
      fetch(process.env.REACT_APP_API_SERVER + "/api/auth/resendEmailVerificationLink", options)
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in register arrive : ", res);
          handleRejectResponse(res.message);
          if (res.success) {
            resolve(res);
          } else {
            reject(res.message);
          }
        })
        .catch((e) => {
          console.log("error : ", e);
          reject(e);
        });
    });
  }
  register(credential: loginCredentials) {
    console.log(credential);
    return new Promise(function (resolve, reject) {
      const options = {
        method: "POST",
        credentials: "include" as RequestCredentials,
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        body: JSON.stringify(credential),
      };
      fetch(process.env.REACT_APP_API_SERVER + "/api/auth/register", options)
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in register arrive : ", res);
          handleRejectResponse(res.message);
          if (res.success) {
            resolve(res);
          } else {
            reject(res.message);
          }
        })
        .catch((e) => {
          console.log("error : ", e);
          reject(e);
        });
    });
  }
  login(credential: loginCredentials) {
    console.log(credential);
    return new Promise(function (resolve, reject) {
      const options = {
        method: "POST",
        credentials: "include" as RequestCredentials,
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        body: JSON.stringify(credential),
      };
      fetch(process.env.REACT_APP_API_SERVER + "/api/auth/login", options)
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in register arrive : ", res);
          handleRejectResponse(res.message);
          if (res.success) {
            resolve(res);
          } else {
            reject(res.message);
          }
        })
        .catch((e) => {
          console.log("error : ", e);
          reject(e);
        });
    });
  }


  logout() {
    localStorage.removeItem("userDetail");
    // localStorage.clear();
  }

  getCurrentUser() {
    const localData = localStorage.getItem("userDetail");
    if (localData == null) {
      return userDetailTemplate;
    }
    return JSON.parse(localData);
  }
  getCurrentUserId() {
    const localData = localStorage.getItem("userDetail");
    if (localData == null) {
      return userDetailTemplate._id;
    }
    return JSON.parse(localData)._id;
  }
  getCurrentUserRole() {
    const localData = localStorage.getItem("userDetail");
    if (localData == null) {
      return userDetailTemplate.role;
    }
    return JSON.parse(localData).role;
  }

}
export default new AuthService();

export interface loginCredentials{
  email: String
  password :String
}