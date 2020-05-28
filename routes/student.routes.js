const bodyParser = require("body-parser");
const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/student.controller");
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

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get("/api/v1/student", [authJwt.verifyToken], controller.studentController);
  
  app.get("/api/v1/student/subjects", [authJwt.verifyToken], controller.subjectController);
 
  app.get("/api/v1/student/tutors", [authJwt.verifyToken], controller.tutorController);

  app.get("/api/v1/student/categories", [authJwt.verifyToken], controller.categoryController);
}