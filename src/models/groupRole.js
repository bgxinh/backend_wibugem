"use strict";
const { Model } = require("sequelize");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");
module.exports = (sequelize, DataTypes) => {
  class GroupRole extends Model {
    static associate(models) {
        
    }
  }
  GroupRole.init(
    {
      groupId:DataTypes.INTEGER, 
      roleId:DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "GroupRole",
    }
  );
  return GroupRole;
};