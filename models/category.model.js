const { Schema, model } = require('mongoose');

const Category = model("Category",
  new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String

  }, { timestamps: true })
);

module.exports = Category;