import bcrypt from "bcryptjs";
import db from "../models/index";
require("dotenv").config();
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        let user = await db.User.findOne({
          where: { email: data.email },
        });
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          user.save();
        resolve({
          codeErr: 0,
          messageErr: "Change infomation user success!",
        });
      } else {
        resolve({
          errCode: 1,
          messageErr: "user not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const changePass = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = checkUserEmail(data.email);
      if (check) {
        let user = await db.findOne({
          where: { email: data.email },
        });
        let newPassword = await hashPassword(data.password);
        user.password = newPassword;
        user.save();
        resolve({
          codeErr: 0,
          messageErr: "Password changed success!",
        });
      } else {
        resolve({
          codeErr: 1,
          messageErr: "User not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  updateUser: updateUser,
  changePass: changePass,
};
