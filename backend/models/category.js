const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Username is required
    unique: true, // Username should be unique
  },
  description: {
    type: String,
    required: true, // Username is required
    unique: true, // Username should be unique
  },
  count: {
    type: Number,
    required: true, // Password is required
  },
  Date: {
    type: Date,
    require: true,
  },
});

const User = mongoose.model("Category", categorySchema);

module.exports = User;
