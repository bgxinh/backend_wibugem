import bcrypt from "bcryptjs";
import db from "../models/index";
require("dotenv").config();
const salt = bcrypt.genSaltSync(10);
import JWTMethod from "../middleware/JWTMethod";
import emailExistence from "email-existence";
import { getGroupWithRoles } from "../services/JWTService";
import { render } from "ejs";
require("dotenv").config();

const hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let passwordHash = await bcrypt.hashSync(password, salt);
      resolve(passwordHash);
    } catch (e) {
      reject(e);
    }
  });
};

const checkEmailExistence = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      emailExistence.check(email, (error, response) => {
        if (error) resolve(false);
        else resolve(response);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) return false;

  if (email.length > 254) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
};

const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const registerUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [isEmailUsed, isValidate, isEmailExist] = await Promise.all([
        checkUserEmail(data.email),
        validateEmail(data.email),
        checkEmailExistence(data.email),
      ]);
      if (isEmailUsed)
        resolve({
          codeErr: 1,
          messageErr: "Email is already use by another user",
        });
      else if (!isValidate) {
        resolve({
          codeErr: 1,
          messageErr: "Email is not valid",
        });
      } else if (!isEmailExist) {
        resolve({
          codeErr: 1,
          messageErr: "Email is not true",
        });
      } else {
        let hashPasswordUser = await hashPassword(data.password);
        await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashPasswordUser,
          groupId: 2,
        });
        resolve({
          codeErr: 0,
          messageErr: "Create usser success!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "password", "groupId"],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compare(password, user.password);
          if (check) {
            userData.codeErr = 0;
            userData.messageErr = "ok";
            userData.user = user;
            delete userData.user.password;
            let roles = await getGroupWithRoles(user);
            let payload = {
              email: email,
              roles,
            };
            userData.token = await JWTMethod.createToken({ payload });
            userData.roles = roles;
          } else {
            userData.codeErr = 2;
            userData.messageErr = "Wrong password";
          }
        }
      } else {
        userData.codeErr = 1;
        userData.messageErr = "Email not found, try another email";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
};
