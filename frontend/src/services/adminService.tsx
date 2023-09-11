import authService from "./authService";
import { handleRejectResponse } from "./systemService";

class adminService {

    getUserDetails(_id : String | undefined) {
        var cred = {_id : _id}
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include" as RequestCredentials,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },

                body: JSON.stringify(cred)
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/getUser", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
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
    updateUserAccountRole(data: { _id: string; role: string; }) {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include" as RequestCredentials,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },

                body: JSON.stringify(data)
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/updateUserAccountRole", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in verifyUserAccount arrive : ", res);
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
    verifyUserAccount(_id: string | undefined) {
        const userId =  authService.getCurrentUserId();
        var cred = {_id : _id}
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include" as RequestCredentials,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },

                body: JSON.stringify(cred)
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/updateUserVerification", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in verifyUserAccount arrive : ", res);
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
    approveUserAccount(_id: string | undefined) {
        const userId =  authService.getCurrentUserId();
        var cred = {_id : _id}
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include" as RequestCredentials,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },

                body: JSON.stringify(cred)
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/updateAccountApproval", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in verifyUserAccount arrive : ", res);
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
    getNewUserDetails() {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include" as RequestCredentials, 
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/getNewUsers", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    handleRejectResponse(res.message);
                    if (res.success) {
                        resolve(res.users);
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
    getAllUserDetails() {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include" as RequestCredentials,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/getUsers", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    handleRejectResponse(res.message);
                    if (res.success) {
                        resolve(res.users);
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

}

export default new adminService();
