// const { verifyJWTToken } = require('../services/JWTservice')
// const User = require('../models/userModel');

// module.exports = async (req, res, next) => {

//     const token = req.cookie("token");

//     if (!token) {
//         return res
//             .status(401)
//             .json({ success: false, message: "Not Authorized. Token not found !!!" });
//     }

//     try {
//         const { _id, type } = verifyJWTToken(token);

//         console.warn({ _id, type });
//         console.log("_id: " + _id + " type: " + type);

//         try {
//             const user = await User.find({ _id }, { _id: 1 });
//             if (user) {
//                 req.user = company[0];
//             }
//             throw new Error("Unauthorized");
//         } catch (error) {
//             return res
//                 .status(401)
//                 .json({ success: false, message: "Not Authorized." });
//         }

//         next();
//     } catch (error) {
//         console.log(error);
//         if (error.name === "JsonWebTokenError") {
//             return res
//                 .status(401)
//                 .json({ success: false, message: "Invalid token. Not Authorized." });
//         }
//         return res
//             .status(500)
//             .json({ success: false, message: "Server internal error" });
//     }
// };


// const { verifyJWTToken } = require('../services/JWTservice');
// const User = require('../models/userModel');

// module.exports = async (req, res, next) => {
//     const token = req.cookies.token; // Corrected from req.cookie

//     console.log(token);

//     if (!token) {
//         return res
//             .status(401)
//             .json({ success: false, message: "Not Authorized. Token not found !!!" });
//     }

//     try {
//         const { _id, role, email } = verifyJWTToken(token);

//         console.table({ _id, role, email });

//         try {
//             const user = await User.findById(_id); // Changed from User.find
//             if (user && user.role === role) {
//                 req.user = user; // Changed from company[0]
//                 return next(); // Added return statement here
//             }

//             throw new Error("Unauthorized");
//         } catch (error) {
//             return res
//                 .status(401)
//                 .json({ success: false, message: "Not Authorized." });
//         }

//     } catch (error) {
//         console.log(error);
//         if (error.name === "JsonWebTokenError") {
//             return res
//                 .status(401)
//                 .json({ success: false, message: "Invalid token. Not Authorized." });
//         }
//         return res
//             .status(500)
//             .json({ success: false, message: "Server internal error" });
//     }
// };


const { verifyJWTToken } = require('../services/JWTservice');
const userModel = require('../models/userModel');

module.exports = (authorizedRoles) => {
    return async (req, res, next) => {
        const token = req.cookies.token;

        // console.log(token);

        if (!token) {
            return res
                .status(401)
                .json({ success: false, message:"TokenExpiredError" ,specialMessage: "Not Authorized. Token not found !!!" });
        }

        try {
            const { _id } = verifyJWTToken(token);

            try {
                const user = await userModel.findById(_id);
                if (!user) {
                    return res
                        .status(401)
                        .json({ success: false, message: "TokenExpiredError", specialMessage: "User not found." });
                }

                if (!authorizedRoles.includes(user.role)) {
                    return res
                        .status(403)
                        .json({ success: false, message: "Insufficient permissions." });
                }

                req.user = user;
                next();
            } catch (error) {
                console.log(error);
                return res
                    .status(401)
                    .json({ success: false, message: "Internal server error"});
            }
        } catch (error) {
            console.log(error);
            if (error.name == "TokenExpiredError") {
                return res.clearCookie("token")
                    .status(401)
                    .json({ success: false, message: error.name });

            } else {
                return res
                    .status(401)
                    .json({ success: false, message: error.name });
            }
        }
    };
};
