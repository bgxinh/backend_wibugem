import authService from "../services/authService";

const handleRegister = async (req, res) => {
  let message = await authService.registerUser(req.body);
  return res.status(200).json(message);
};

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email, password);
  if (!email || !password) {
    return res.status(200).json({
      codeErr: 1,
      messageErr: "Missing input login",
    });
  } else {
    try {
      let userData = await authService.loginUser(email, password);
      if (userData.codeErr === 0) {
        res.cookie("token", userData.token, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          httpOnly: false,
        });
      }
      return res.status(200).json({
        codeErr: userData.codeErr,
        messageErr: userData.messageErr,
        user: userData.user ? userData.user : {},
        token: userData.token ? userData.token : {},
        roles: userData.roles ? userData.roles : {},
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        codeErr: 2,
        messageErr: "Server error",
      });
    }
  }
};

const getLoginPage = (req, res) => {
  return res.render("test/login.ejs");
};

module.exports = {
  handleRegister: handleRegister,
  handleLogin: handleLogin,
  getLoginPage: getLoginPage,
};
