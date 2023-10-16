
import { handleRejectResponse } from "./systemService";
import { userDetailTemplate } from "../interfaces/tamplates";

const fetchPostOptions = {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  },
};
class AuthService {
  resendVerificationLink(credential) {
    console.log(credential);
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body=JSON.stringify(credential);
      fetch(
        process.env.REACT_APP_API_SERVER +
          "/api/auth/resendEmailVerificationLink",
          fetchPostOptions
      )
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in register arrive : ", res);
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
  register(credential) {
    console.log(credential);
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body=JSON.stringify(credential);

      fetch(process.env.REACT_APP_API_SERVER + "/api/auth/register", fetchPostOptions)
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in register arrive : ", res);
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
  login(credential) {
    console.log(credential);
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body=JSON.stringify(credential);

      fetch(process.env.REACT_APP_API_SERVER + "/api/auth/login", fetchPostOptions)
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in register arrive : ", res);
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
