import authService from "./authService";
import { handleRejectResponse } from "./systemService";
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

class adminService {
  getUserDetails(_id) {
    var cred = { _id: _id };
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify(cred);
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/user/getUser",
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
  updateUserAccountRole(data) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify(data);
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/user/updateUserAccountRole",
        fetchPostOptions
      )
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in verifyUserAccount arrive : ", res);
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
  verifyUserAccount(_id) {
    const userId = authService.getCurrentUserId();
    var cred = { _id: _id };
    return new Promise(function (resolve, reject) {
      fetchPostOptions = JSON.stringify(cred);
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/user/updateUserVerification",
        fetchPostOptions
      )
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in verifyUserAccount arrive : ", res);
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
  approveUserAccount(_id) {
    const userId = authService.getCurrentUserId();
    var cred = { _id: _id };
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify(cred);
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/user/updateAccountApproval",
        fetchPostOptions
      )
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in verifyUserAccount arrive : ", res);
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
  getNewUserDetails() {
    return new Promise(function (resolve, reject) {
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/user/getNewUsers",
        fetchPostOptions
      )
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in getNewUserDetails arrive : ", res);
          if (res.success) {
            resolve(res.users);
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
  getAllUserDetails() {
    return new Promise(function (resolve, reject) {
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/user/getUsers",
        fetchPostOptions
      )
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in getNewUserDetails arrive : ", res);
          if (res.success) {
            resolve(res.users);
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
}

export default new adminService();
