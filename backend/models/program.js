const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  talent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Assuming User model is used for talents
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  participantsCount: {
    type: Number,
    default: 0,
  },
});

const Service = mongoose.model("Program", programSchema);

module.exports = Service;
