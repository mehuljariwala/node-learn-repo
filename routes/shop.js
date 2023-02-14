const express = require("express");
const path = require("path");
const { productList } = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  // with pug.js
  res.render("pug/shop", {
    prods: productList,
    pageTitle: "My Shop",
    path: "/",
  });

  // normal sendFile
  // res.sendFile(path.resolve("views/shop.html"));
});

module.exports = router;
