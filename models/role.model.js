const { Schema, model } = require('mongoose');

const Role = model("Role",
  new Schema({
    name: {
      type: String,
      required: true
    }
  })
);

module.exports = Role;