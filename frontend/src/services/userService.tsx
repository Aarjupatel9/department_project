import authService from "./authService";
import { userProfile } from "../reduxStore/reducers/userDetailSlice";
import { handleRejectResponse } from "./systemService";
class UserService {

    updateProfile(data : userProfile) {

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
            fetch(process.env.REACT_APP_API_SERVER + "/api/profile/updateProfile", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in updateProfile arrive : ", res);
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

    getUserProfile(_id : String | undefined) {

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
                body: JSON.stringify({ _id: _id }),
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/profile/getProfile", options)
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
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
    getAllVariables() {

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
            fetch(process.env.REACT_APP_API_SERVER + "/api/system/getAllVariables", options)
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
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
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
    saveUserPreferTheme(themeName :String) {
        localStorage.setItem("getUserPreferTheme", JSON.stringify(themeName));
    }
}

export default new UserService();

export interface ApiRequestOptions {
    method: String,
    credentials: String,
    headers: {
        "Content-Type": String,
        "Access-Control-Allow-Origin": String,
        "Access-Control-Allow-Method": String,
        "Access-Control-Allow-Headers": String,
    },
    body: String
}