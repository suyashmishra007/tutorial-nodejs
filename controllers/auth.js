exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

// !
exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  console.log("LINE 12", req.session.isLoggedIn);
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log("Error clearing session:", err);
      return;
    }
    res.redirect("/");
  });
};
