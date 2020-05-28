const Subject = require("../models/subjects.model");
const Category = require("../models/category.model");
const Tutor = require("../models/tutors.model");

const tutorBoard = (req, res) => {
  res.status(200).send("Tutor Content.");
};

const subjectController = {
  getSubject: (req, res) => {
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
}

const categoryController = {
  getCategory: (req, res) => {
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
}

const tutorController = {
  register: (req, res) => {
    const { tutor } = req;
    const id = req.body._id
    .then(() => {
      delete req.body._id;
    })
    .catch((err) => {
      console.error(err);
      
    })
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      tutor[key] = value; 
    })
    .then(() => {
      Tutor.findByIdAndUpdate(id, tutor, (err, document) => {
        if (err) {
          return res.send(err);
        }
        document.save((err) => {
          if (err) {
            return res.send(err);
          }
          return res.send("Successfully registered subjects").json(document);
        })
      })
    })
    .catch(err => {
      console.error(err);   
    }) 
  },
  deleteSubject: (req, res) => {
    if (Tutor.exists({"subjects": [req.query.subject]})) {
      Subject.findOneAndDelete({"name": req.query.subject}, (err, document) => {
        if (err) {
          return res.send(err);
        }
        return res.send(`Successfully deleted ${document}`);
      })
    }
  },
  updateSubject: (req, res) => {
    if (Tutor.exists({"subjects": req.query.subject})) {
      Subject.findOneAndUpdate({"name": req.query.subject}, (err, document) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Successfully Updated subject").json(document); 
      })
    }
  },
  getRegisteredSubject: (req, res) => {
    const id = req.query._id 
    Tutor.findById(id).project({_id: 0, subjects: 1}).populate((err, subjects) => {
      if (err) {
        return res.send(err);
      }
      return res.json(subjects);
    })
  }

}

module.exports = {
  tutorBoard,
  subjectController,
  categoryController,
  tutorController
}