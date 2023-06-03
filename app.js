const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.set("view engine", "pug");

app.use((req, res, next) => {
  res.status(404).render("404.pug", { pageTitle: "Page Not Found" });
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
