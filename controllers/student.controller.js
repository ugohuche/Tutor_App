const Subject = require("../models/subjects.model");
const Tutor = require("../models/tutors.model");
const Category = require("../models/category.model");

const studentController = (req, res) => { 
  res.status(200).send("Student Content.");
};

function subjectController() {
  function getSubject(req, res) {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    Subject.find(query, (err, subjects) => {
      if (err) {
        return res.send(err);
      }
      const returnSubjects = subjects.map((subject) => {
        return subject.toJSON();
      });
      return res.json(returnSubjects);
    })
  }
  return {getSubject};
}

function tutorController() {
  function getTutor(req, res) {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query.subject) {
      query.subject = [req.query.subject];
    }
    Tutor.find(query, (err, tutors) => {
      if (err) {
        return res.send(err);
      }
      const returnTutor = tutors.map((tutor) => {
        return tutor.toJSON();
      });
      return res.json(returnTutor);
    })
  }
  return {getTutor};
}

function categoryController() {
  function getCategory(req, res) {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    Category.find(query, (err, categories) => {
      if (err) {
        return res.send(err);
      }
      const returnCategory = categories.map((category) => {
        return category.toJSON();
      });
      return res.json(returnCategory);
    })
  }
  return {getCategory};
}

module.exports = {
  studentController,
  subjectController,
  tutorController,
  categoryController
}