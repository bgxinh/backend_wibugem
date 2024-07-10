import { cache, render } from "ejs";
import db from "../models/index";
import { Model } from "sequelize";
import userService from "../services/userService";

const changeInformation = async (req, res) => {
  if (!req.body) {
    return res.status(200).json({
      codeErr: 1,
      messageErr: "Missing parameter",
    });
  } else {
    let message = await userService.updateUser(req.body);
    return res.status(200).json(message);
  }
};

const changePassword = async (req, res) => {
  if (!req.body) {
    return res.status(200).json({
      codeErr: 1,
      messageErr: "Missing parameter",
    });
  } else {
  }
};

module.exports = {
  changeInformation: changeInformation,
  changePassword: changePassword
};
