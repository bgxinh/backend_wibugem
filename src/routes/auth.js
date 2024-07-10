import express, { Router } from "express";
import authController from "../controllers/authController";
import passport from "passport";
let router = express.Router();
import checkUser from "../middleware/checkUser";

let authRoutes = (app) => {
  router.post("/apiregister", authController.handleRegister);
  // router.post("/apilogin", authController.handleLogin);
  router.get("/loginpage",checkUser.isLogin, authController.getLoginPage);

  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  // router.get(
  //   "/auth/google",
  //   passport.authenticate("google", { scope: ["profile"] })
  // );

  // router.get(
  //   "google/redirect",
  //   passport.authenticate("google", { failureRedirect: "/login" }),
  //   function (req, res) {
  //     // Successful authentication, redirect home.
  //     res.redirect("/");
  //   }
  // );

  return app.use("/auth/v1", router);
};

export default authRoutes;
