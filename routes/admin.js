const express = require("express");
const path = require("path");

//router object to manage routes
const router = express.Router();

const productList = [];

// /admin/add-product ==> GET
router.get("/add-product", (req, res, next) => {
  // with pug.js
  res.render("pug/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });

  // normal html
  // res.sendFile(path.resolve("views/add-product.html"));
});

// /admin/add-product ==> POST
router.post("/add-product", (req, res, next) => {
  productList.push({ title: req.body.title });
  res.redirect("/");
});

module.exports = {
  router,
  productList,
};
