const { Schema, model } = require('mongoose');

const Tutor = model("Tutor",
  new Schema ({
    name: {
      type: String,
      required: true,
      unique: true
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
      }
    ]
  }, { timestamps: true })
);

module.exports = Tutor;