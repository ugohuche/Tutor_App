const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const Category = require("./models/category.model");
const Role = require("./models/role.model");

require("./routes/user.routes")(app);
require("./routes/student.routes")(app);
require("./routes/tutor.routes")(app);
require("./routes/admin.routes")(app);
require("./routes/auth.routes")(app);

const port = process.env.PORT || 3000;
let corsOption = {
  origin: "http://localhost:8081"
};

mongoose.connect('mongodb://localhost:27017/tutorApp_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connected to MongoDB.");
  initial();
  createCategory();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "student"
      }).save(err => {
        if (err) {
          console.log("error", err); 
        }
        console.log("added 'student' to roles collection");
        
      });

      new Role({
        name: "tutor"
      }).save(err => {
        if (err) {
          console.log('error', err);       
        }
        console.log("added 'tutor' to roles collection");       
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log('error', err);       
        }
        console.log("added 'admin' to roles collection");       
      });
    }
  });
}

function createCategory() {
  Category.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Category({
        name: "Beginner",
        description: "Category for beginner students"
      }).save(err => {
        if (err) {
          console.log("error", err); 
        }
        console.log("added 'Beginner' to category collection");
        
      });

      new Category({
        name: "Intermediate",
        description: "Category for intermediate students"
      }).save(err => {
        if (err) {
          console.log('error', err);       
        }
        console.log("added 'Intermediate' to category collection");       
      });

      new Category({
        name: "Advanced",
        description: "Category for advanced students"
      }).save(err => {
        if (err) {
          console.log('error', err);       
        }
        console.log("added 'Advanced' to category collection");       
      });
    }
  });
}


app.use(cors(corsOption));
/*app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());*/

//app.use('/api/v1', authRoutes, userRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to our tutoring app');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
