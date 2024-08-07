// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
// const asyncHandler = require("./asyncHandler");

// // const authenticate = asyncHandler(async (req, res, next) => {
// //   let token;

// //   // Read JWT from the "jwt" cookie
// //   token = req.cookies.jwt;

// //   if (token) {
// //     try {
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //       req.user = await User.findById(decoded.userId).select("-password");
// //       next();
// //     } catch (error) {
// //       res.status(401);
// //       throw new Error("Not authorized, token failed.");
// //     }
// //   } else {
// //     res.status(401);
// //     throw new Error("Not authorized, no token.");
// //   }
// // });

// //===========  Check for the admin if the user is admin or not  =============//

// const authorizeAdmin = (req, res, next) => {
//   try {
//     if (!req.query.adminId) {
//       next();
//       return;
//     }
//     let token = req.headers["authorization"];
//     if (!token) {
//       return res.status(400).send({
//         success: false,
//         message: "Token is required",
//       });
//     }
//     let decode = await jwt.verify(token, process.env.SECRET_KEY);
//     if (!decode) {
//       return res.status(400).send({
//         success: false,
//         message: "Invailid token",
//         isAuthorization: false,
//       });
//     }
//     if (decode._id != req.query.adminId) {
//       return res.status(400).send({
//         success: false,
//         message: "Invailid token",
//       });
//     }

//     next();
//   } catch (error) {
//     return res.status(500).send({ success: false, message: error.message });
//   }
// };

// //=====================  JWT token  =====================//

// exports.authenticate = asyncHandler(async (req, res, next) => {
//   try {
    
//     let token = req.headers["authorization"];
//     if (!token) {
//       return res.status(400).send({
//         success: false,
//         message: "Token is required",
//       });
//     }
//     let decode = await jwt.verify(token, process.env.SECRET_KEY);
//     if (!decode) {
//       return res.status(400).send({
//         success: false,
//         message: "Invailid token",
//         isAuthorization: false,
//       });
//     }
//     if (decode._id != req.query.adminId) {
//       return res.status(400).send({
//         success: false,
//         message: "Invailid token",
//       });
//     }

//     next();
//   } catch (error) {
//     return res.status(500).send({ success: false, message: error.message });
//   }
// });

// export { authenticate, authorizeAdmin };
