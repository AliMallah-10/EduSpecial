const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  contact: {
    phone: String,
    address: String,
  },
  specialNeeds: {
    type: String,
    required: true,
  },
});

const People = mongoose.model("People", peopleSchema);

module.exports = People;
