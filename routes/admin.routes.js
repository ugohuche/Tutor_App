const bodyParser = require("body-parser");
const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/admin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get(
    "/api/v1/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/v1/admin/categories",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.categoryController.getCategory
  ).patch(
    "/api/v1/admin/categories",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.categoryController.updateCategory
  ).delete(
    "/api/v1/admin/categories",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.categoryController.deleteCategory
  );

  app.get(
    "/api/v1/admin/lessons",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.lessonController.getLesson
  ).put(
    "/api/v1/admin/lessons",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.lessonController.addLesson
  ).patch(
    "/api/v1/admin/lessons",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.lessonController.updateLesson
  ).delete(
    "/api/v1/admin/lessons",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.lessonController.deleteLesson
  );

  app.get(
    "/api/v1/admin/tutors",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.tutorController.getTutor
  ).delete(
    "/api/v1/admin/tutors",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.tutorController.removeTutor
  );

  app.get(
    "/api/v1/admin/subjects",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.subjectController.getSubject
  ).put(
    "/api/v1/admin/subjects",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.subjectController.createSubject
  ).patch(
    "/api/v1/admin/subjects",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.subjectController.updateSubject
  ).delete(
    "/api/v1/admin/subjects",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.subjectController.deleteSubject
  );
}
