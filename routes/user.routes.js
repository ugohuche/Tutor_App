const controller = require("../controllers/user.controller");
//const express = require("express");


module.exports = function(app) {
  //const router = express.Router();
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/all", controller.allAccess);


};