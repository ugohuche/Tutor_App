const bodyParser = require("body-parser");
const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/tutor.controller");
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

  app.get( "/api/v1/tutor",
  [authJwt.verifyToken, authJwt.isTutor],
  controller.tutorBoard )

  app.get("/api/v1/tutor/register",
  [authJwt.verifyToken, authJwt.isTutor],
  controller.tutorController.register)

  app.get("/api/v1/tutor/subjects",
  [authJwt.verifyToken, authJwt.isTutor],
  controller.subjectController.getSubject
  ).patch(
    "/api/v1/tutor/subjects",
  [authJwt.verifyToken, authJwt.isTutor],
  controller.tutorController.updateSubject
  ).delete(
    "/api/v1/tutor/subjects",
  [authJwt.verifyToken, authJwt.isTutor],
  controller.tutorController.deleteSubject)
}