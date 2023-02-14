const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// invoke the express app object to to get thr functionality
const app = express();

// external template engince which help to bind dyamic data with html.
app.set("view engine", "pug");

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

// if you are request for route and it not found then it will catch here
// app.use((req, res, next) => {
//   res.status(404).sendFile(path.resolve("views/404.html"));
// });

// pub 404 page
app.use((req, res, next) => {
  res.status(404).render("pug/404");
});

// you can provide any port number to start server
// better you use 8000 something...
app.listen(9090, () => {
  console.log("server started on 9090");
});
