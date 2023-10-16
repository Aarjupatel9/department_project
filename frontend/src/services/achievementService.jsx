import { IEvent } from "../interfaces/interfaces";
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

class UserService {
  addAchievement(data) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify(data);
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/achievement/add-achievement",
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
  updateAchievement(_id, data) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify(data);
      fetch(
        process.env.REACT_APP_API_SERVER +
          "/api/achievement/update-achievement/" +
          _id,
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

  getAchievement(_id) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify({_id:_id});
      fetch(
        process.env.REACT_APP_API_SERVER +
          "/api/achievement/achievement/" +
          _id,
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
  getAchievements() {
    return new Promise(function (resolve, reject) {
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/achievement/achievements",
        fetchPostOptions
      )
        .then((response) => {
          console.log("fetch then response :", response);
          if (response.status === 404) {
            reject("path not found");
          }
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
  deleteAchievement(_id) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify({ _id: _id });

      fetch(
        process.env.REACT_APP_API_SERVER +
          "/api/achievement/delete-achievement/" +
          _id,
        fetchPostOptions
      )
        .then((response) => {
          console.log("fetch then response :", response);
          if (response.status === 404) {
            reject("path not found");
          }
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

  uploadReportOfEvent(formData) {
    return new Promise(function (resolve, reject) {
      const fetchPostOptions = {
        method: "POST",
        credentials: "include",
        headers: {
          // "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        body : formData,
      };
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/system/upload-reports",
        fetchPostOptions
      )
        .then((response) => {
          console.log("uploadReportOfEvent || fetch then response :", response);
          if (response.status === 404) {
            reject("path not found");
          }
          return response.json();
        })
        .then((res) => {
          console.log("uploadReportOfEvent ||response in arrive : ", res);
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
}

export default new UserService();
