const { model, Schema } = require("mongoose");

const Subject = model("Subject",
  new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lessons",
        required: true
      }
    ],
    category: 
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  }, { timestamps: true })
);

module.exports = Subject;