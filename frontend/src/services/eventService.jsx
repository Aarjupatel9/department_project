
import { handleRejectResponse } from "./systemService";
import { fetchPostOptions } from "./constants";

class UserService {
  addEvent(data) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify(data);
      fetch(process.env.REACT_APP_API_SERVER + "/api/event/add-event", fetchPostOptions)
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
  updateEvent(data) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify(data);
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/event/update-event/",
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

  getEvent(_id) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify({ _id: _id });
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/event/event/" + _id,
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
  getEvents() {
    return new Promise(function (resolve, reject) {
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/event/events",
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
  deleteEvent(_id) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = JSON.stringify({ _id: _id });
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/event/delete-event",
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

  uploadReportOfEvent(formData) {
    return new Promise(function (resolve, reject) {
      fetchPostOptions.body = formData;
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/system/upload-reports",
        fetchPostOptions
      )
        .then((response) => {
          console.log("uploadReportOfEvent || fetch then response :", response);
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
