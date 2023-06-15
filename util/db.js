const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const MONGODB_URI = "mongodb://0.0.0.0:27017/shop";

module.exports = () => {
  // mongoose
  //   .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  //   .then((result) => {
  //     app.listen(PORT, () => {
  //       console.log(`listening on http://localhost:${PORT}`);
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
