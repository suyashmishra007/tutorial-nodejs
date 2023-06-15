const path = require("path");
const mongoose = require("mongoose");
const PORT = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const errorController = require("./controllers/error");
const User = require("./models/user");
const MONGODB_URI = "mongodb://0.0.0.0:27017/shop";
const flash = require("connect-flash");
// const connectDB = require("./util/db");
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// ! Not using csrf token
// app.use((req, res, next) => {
//   (res.locals.isAuthenticated = req.session.isLoggedIn),
//     (res.locals.csrfToken = req.csrfToken());
//   next();
// });

app.use("/admin", adminRoutes);
// app.use((req, res, next) => {
//   req.locals.isAuthenticated = req.session.isLoggedIn;
//   next();
// });
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// connectDB();
mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
