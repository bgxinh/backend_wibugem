import express from "express";
import adminController from "../controllers/adminController";
import checkUser from "../middleware/checkUser";
let router = express.Router();

let initAdminRoutes = (app) => {
  router.get("/homepage", checkUser.isLogin, adminController.getHomepage);
  router.delete("/user-delete", adminController.deleteUser);
  router.get("/getUser/", adminController.getAllUser);
  return app.use("/admin/v1", router);
};

export default initAdminRoutes;
