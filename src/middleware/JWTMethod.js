import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecurePaths = ["/apiregister", "/apilogin", "/loginpage"];

const createToken = (payload) => {
  let accessToken = null;
  try {
    accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    return accessToken;
  } catch (error) {
    console.log(error);
    return accessToken;
  }
};

let verifyToken = (token) => {
  try {
    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (e) {
    console.log(e);
  }
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let decoded = verifyToken(cookies.jwt);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        codeErr: -1,
        messageErr: "Not authenticated user",
      });
    }
  } else {
    return res.status(401).json({
      codeErr: -1,
      messageErr: "Not authenticated user",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  if (req.user) {
    let email = req.user.payload.email;
    let roles = req.user.payload.roles;
    let currntUrl = req.path;
    if (!roles || roles.lenght === 0) {
      return res.status(403).json({
        codeErr: -1,
        messageErr: "You have no permission",
      });
    }
    let canAccessUrl = roles.some((item) => item["Roles.url"] === currntUrl);
    if (canAccessUrl) {
      next();
    } else {
      return res.status(403).json({
        codeErr: -1,
        messageErr: "You have no permission",
      });
    }
  } else {
    return res.status(401).json({
      codeErr: -1,
      messageErr: "Not authenticated user",
    });
  }
};
module.exports = {
  createToken: createToken,
  verifyToken: verifyToken,
  checkUserJWT: checkUserJWT,
  checkUserPermission: checkUserPermission,
};
