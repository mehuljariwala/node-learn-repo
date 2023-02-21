const express = require("express");
const path = require("path");

const { engine } = require("express-handlebars");

const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// invoke the express app object to to get the functionality
const app = express();

// HANDLEBARS SETUP
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// external template engince which help to bind dyamic data with html. [ THIS IS DEFAULT PROVIDED BY NODEJS ]
// app.set("view engine", "pug");

// setting the page views folder here to pickup the file
app.set("views", "views");

// without this we will not get the body request better to use it
// this is kind of buffer its provide.
app.use(bodyParser.urlencoded({ extended: true }));

// if you want to send the css/ folder then use this. method
app.use(express.static(path.resolve("public")));

// if you use /admin then it will prefix to add
// eg: /admin/add-product
// if you are not using then it will treat is /add-product
app.use("/admin", adminRoutes.router);

//all other routes go here
app.use(shopRoutes);

// if you are request for route and it not found then it will catch here [WITHOUT TEMPLATE]
// app.use((req, res, next) => {
//   res.status(404).sendFile(path.resolve("views/404.html"));
// });

// PUG TEMPLATE =>
// app.use((req, res, next) => {
//   res.status(404).render("pug/404", { pageTitle: "Page not found" });
// });

app.use((req, res, next) => {
  // HBS TEMPLATE =>
  res.status(404).render("404", { pageTitle: "Page not found" });
});
// you can provide any port number to start server
// better you use 8000 something...
app.listen(9090, () => {
  console.log("server started on 9090");
});
