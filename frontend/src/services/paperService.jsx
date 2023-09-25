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
  addPaper(data) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify(data);
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/publication/add-publication",
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
  updatePaper(_id, data) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify(data);
      fetch(
        process.env.REACT_APP_API_SERVER +
          "/api/publication/update-publication/" +
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

  getPaper(_id) {
    return new Promise(function (resolve, reject) {
      const fetchPostOptions = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        body: JSON.stringify({ _id: _id }),
      };
      fetch(
        process.env.REACT_APP_API_SERVER +
          "/api/publication/publication/" +
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
  getPapers() {
    return new Promise(function (resolve, reject) {
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/publication/publications",
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
  deletePaper(_id) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify({ _id: _id });

      fetch(
        process.env.REACT_APP_API_SERVER +
          "/api/publication/delete-publication/" +
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
      fetchPostOptions.body = formData;
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
