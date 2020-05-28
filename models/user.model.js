const { Schema, model } = require('mongoose');

const User = model("User",
  new Schema({
    username: {
      type: String,
      required: true,
      min: 4,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  }, { timestamps: true })
);

module.exports = User;