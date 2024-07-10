import LocalStrategy from "passport-local";
import passport from "passport";
import authService from "../services/authService";

const configPassport = () => {
  passport.use(
    new LocalStrategy(async function verify(username, password, cb) {
      let res = await authService.loginUser(username, password);
      if (res && res.codeErr === 0) {
        return cb(null, res);
      } else {
        return cb(null, false, { message: res.messageErr });
      }
    })
  );
};
module.exports = { configPassport };
