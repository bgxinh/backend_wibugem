import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";
import { check } from "email-existence";
const getGroupWithRoles = async (user) => {
  try {
    let roles = await db.Group.findAll({
      where: { id: user.groupId },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: {
          attributes: [],
        },
      },
      raw: true,
      // nest: true,
    });
    return roles ? roles : {};
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getGroupWithRoles: getGroupWithRoles,
};
