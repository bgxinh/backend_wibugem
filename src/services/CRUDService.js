import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
import mysql from "mysql2/promise";
import { where } from "sequelize";
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

const validateEmail = (email) => {
  var emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!email) return false;

  if (email.length > 254) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
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

let checkUserEmail = (userEmail) => {
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

const createNewUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkExist = await checkUserEmail(userData.email);
      let validate = await validateEmail(userData.email);
      if (checkExist) {
        resolve({
          codeErr: 1,
          messageErr: "Email is already user by another user",
        });
      } else if (!checkExist && !validate) {
        resolve({
          codeErr: 1,
          messageErr: "Email is not valid",
        });
      } else {
        let hashPasswordUser = await hashPassword(userData.password);
        await db.User.create({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.hashPasswordUser,
          groupId: userData.groupId,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await db.User.destroy({
        where: { id: userId },
      });
      if (check === 0) {
        resolve({
          codeErr: 1,
          messageErr: "User not found",
        });
      } else {
        resolve({
          codeErr: 0,
          messageErr: "Delete success!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getUser = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users;
      if (idUser === "ALL") {
        users = await db.User.findAll({
          attributes: ["id", "email", "phoneNumber"],
          include: {
            model: db.Group,
            attributes: ["name", "description"],
          },
          raw: true,
          nest: true,
        });
      } else {
        users = await db.User.findOne({
          where: { id: idUser },
          attributes: ["id", "email", "phoneNumber"],
          include: {
            model: db.Group,
            attributes: ["name", "description"],
          },
          raw: true,
          nest: true,
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

const getUserPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    let totalPage = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPage: totalPage,
      users: rows,
    };
    return {
      errCode: 0,
      mesageErr: "Sucesss",
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: 1,
      mesageErr: "Something went wrong",
      data: [],
    };
  }
};

const upDateUserInformation = (data) => {
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
module.exports = {
  createNewUser: createNewUser,
  deleteUserById: deleteUserById,
  getUser: getUser,
  createNewUser: createNewUser,
  upDateUserInformation: upDateUserInformation,
  getUserPagination: getUserPagination,
};
