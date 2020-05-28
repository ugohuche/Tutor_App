const Category = require("../models/category.model");
const Tutor = require("../models/tutors.model");
const Lesson = require("../models/lessons.model");
const Subject = require("../models/subjects.model");

const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

const subjectController = {
  createSubject: async(req, res) => {
    if (typeof(req.body) === "object") {
      if (!req.body.name) {
        res.status(400);
        return res.send("Name is required");
      }
      if (!req.body.category || !req.body.lessons) {
        res.status(400);
        return res.send("Category and Lessons required");
      }
      const subject = new Subject({
        name: req.body.name
      })
      await Lesson.find(
        {
          title: { $in: req.body.lessons}
        },
        (err, lessons) => {
          if (err) {
            return res.status(500).send({ message: err});
          }
          if (lessons === null) {
            return res.send("Inputed non-existent lesson")
          }
          subject.lessons = lessons.map(lesson => lesson._id);
        }
      )
      await Category.findOne(
        {
          name: req.body.category
        },
        (err, category) => {
          if (err) {
            return res.status(500).send({ message: err});
          }
          if (category === null) {
            return res.send("No such category");
          }
          subject.category = category._id;
          
        }
      )
      subject.save((err) => {
        if (err) {
          return res.send(`Error creating subject ${err}`);
        }
        return res.json({
          message: "Successfully added subject",
          subject
        });
      })
    } else {
      req.body.map(async body => {
        if (!body.name) {
          res.status(400);
          return res.send("Name is required");
        }
        if (!body.category || !body.lessons) {
          res.status(400);
          return res.send("Category and Lessons required");
        }
        const subject = new Subject({
          name: body.name
        })
        await Lesson.find(
          {
            title: { $in: body.lessons}
          },
          (err, lessons) => {
            if (err) {
              return res.status(500).send({ message: err});
            }
            if (lessons === null) {
              return res.send("Inputed non-existent lesson")
            }
            subject.lessons = lessons.map(lesson => lesson._id);
          }
        )
        await Category.findOne(
          {
            name: body.category
          },
          (err, category) => {
            if (err) {
              return res.status(500).send({ message: err});
            }
            if (category === null) {
              return res.send("No such category");
            }
            subject.category = category._id;
            
          }
        )
        subject.save((err) => {
          if (err) {
            return res.send(`Error creating subject ${err}`);
          }
          return res.json({
            message: "Successfully added subject",
            subject
          });
        })
      })
    }
  },
  getSubject: (req, res) => {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    Subject.find(query).populate('lessons category', 'title name -_id').exec((err, subjects) => {
      if (err) {
        return res.send(err);
      }
      const returnSubjects = subjects.map((subject) => {
        return subject.toJSON();
      });
      return res.json(returnSubjects);
    })
  },
  updateSubject: (req, res) => {
    const subject = {};
    const id = req.query.id
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      subject[key] = value; 
    })
    Subject.findByIdAndUpdate(id, subject).populate('lessons category', 'title name -_id').exec((err, document) => {
      if (err) {
        return res.send(err);
      }
      document.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json({
          message: "Successfully updated subject",
          subject: document
        });
      })
    })
  },
  deleteSubject: (req, res) => {
    const id = req.query.subjectId;
    Subject.findByIdAndDelete(id, (err, document) => {
      if (err) {
        return res.send(err);
      }
      return res.send('Successfully deleted subject').json(document);
    })
  }
}

const categoryController = {
  getCategory: (req, res) => {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query._id) {
      query._id = req.query._id;
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
  },

  updateCategory: (req, res) => {
    const category  = {};
    const id = req.query._id
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      category[key] = value; 
    })
    Category.findByIdAndUpdate(id, category, (err, document) => {
      if (err) {
        return res.send(err);
      }
      document.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Successfully updated category").json(document);
      })
    })
  },

  deleteCategory: (req, res) => {
    const id = req.query._id;
    Category.findByIdAndDelete(id, (err) => {
      if (err) {
        return res.send(err);
      }
      return res.send("Successfully deleted category");
    })
  }
}

const tutorController = {
  getTutor: (req, res) => {
    const query = {};
    if (req.query._id) {
      query._id = req.query._id;
    }
    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query.subject) {
      query.subject = [req.query.subject];
    }
    Tutor.find(query).populate('subjects', 'name -_id').exec((err, tutors) => {
      if (err) {
        return res.send(err);
      }
      const returnTutor = tutors.map((tutor) => {
        return tutor.toJSON();
      });
      return res.json(returnTutor);
    })
  },
  removeTutor: (req, res) => {
    const id = req.query._id;
    Tutor.findByIdAndRemove(id, (err, tutor) =>{
      if (err) {
        return res.send(err);
      }
      return res.send(`Successfully deactivated ${tutor}`);
    })
  }
}

const lessonController = {
  addLesson: (req, res) => {
    if (typeof(req.body) === 'object') {
      if (!req.body.title || !req.body.author) {
        res.status(400);
        return res.send("Title and Author required");
      }
      if (!req.body.date_created) {
        res.status(400);
        return res.send("Date created required");
      }
      new Lesson(req.body).save((err, lesson) => {
        if (err) {
          return res.send(`Error adding lesson - ${err}`);
        }
        res.send("Successfully added lesson");
        return res.json(lesson);
      }) 
    } else {
      req.body.map(body => {
        if (!body.title || !body.author) {
          res.status(400);
          return res.send("Title and Author required");
        }
        if (!body.date_created) {
          res.status(400);
          return res.send("Date created required");
        }
        new Lesson(body).save((err, lesson) => {
          if (err) {
            return res.send(`Error adding lesson - ${err}`);
          }
          res.send("Successfully added lesson");
          return res.json(lesson);
        })  
      })
    }
  },
  getLesson: (req, res) => {
    const query = {};
    if (req.query._id){
      query._id = req.query._id;
    }
    if (req.query.title) {
      query.title = req.query.title;
    }
    if (req.query.author) {
      query.author = req.query.author;
    }
    Lesson.find(query, (err, lessons) => {
      if (err) {
        return res.send(err);
      }
      const returnLesson = lessons.map((lesson) => {
        return lesson.toJSON();
      });
      return res.json(returnLesson);
    })
  },
  updateLesson: (req, res) => {
    const lesson = {};
    const id = req.query._id
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      lesson[key] = value; 
    })
    Lesson.findByIdAndUpdate(id, lesson, (err, document) => {
      if (err) {
        return res.send(err);
      }
      document.save((err) => {
        if (err) {
          return res.send(err);
        }
        res.send("Successfully updated lesson");
        return res.json(document);
      })
    })
  },

  deleteLesson: (req, res) => {
    const id = req.query._id;
    Lesson.findByIdAndDelete(id, (err, lesson) => {
      if (err) {
        return res.send(err);
      }
      return res.send('Successfully deleted Lesson').json(lesson);
    })
  }

}

module.exports = {
  adminBoard,
  subjectController,
  categoryController,
  tutorController,
  lessonController
}