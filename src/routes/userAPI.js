import express, { Router } from "express";
import userController from "../controllers/userController";
import e from "express";
let router = express.Router();
import { checkUserJWT, checkUserPermission } from "../middleware/JWTMethod";

let initUserRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);
  return app.use("/user/v1", router);
};

export default initUserRoutes;
