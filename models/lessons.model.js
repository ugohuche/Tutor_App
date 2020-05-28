const { Schema, model } = require('mongoose');

const Lessons = model("Lessons",
  new Schema({
    title: {
      type: String,
      required: true,
      unique: true
    },
    author: {
      type: String,
      required: true
    }
  }, { timestamps: true })
);

module.exports = Lessons;