const isLogin = (req, res, next) => {
  if(req.isAuthenticated()){
    if(req.path === '/loginpage'){
      res.redirect("http://localhost:8080/admin/v1/homepage");
    }
    next();
  } else{
      if(req.path === '/loginpage'){
        next();
      }
      else{
        res.redirect("http://localhost:8081/auth/v1/loginpage");
      }
  }
};

module.exports = { isLogin };
