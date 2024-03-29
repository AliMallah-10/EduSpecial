const Program = require("../models/program");
const Category = require("../models/category");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
// Middleware to check if the program name is unique
exports.checkUniqueName = async (req, res, next) => {
  try {
    // Convert req.body to JSON string and then parse it back to a JavaScript object
    // const bodyData = JSON.parse(JSON.stringify(req.body));

    const { name } = bodyData;
    console.log("The name gggggggggggggg:", name);
    const existingProgram = await Program.findOne({ name });
    console.log("The name:", name);
    if (existingProgram) {
      return res.status(400).json({
        message: "Program with this name already exists",
        existingProgramName: existingProgram.name,
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Middleware to check if the price is greater than or equal to 0
exports.checkValidPrice = (req, res, next) => {
  const { price } = req.body;

  if (price < 0) {
    return res.status(400).json({ message: "Price cannot be negative" });
  }

  next();
};

// Middleware to check if the referenced category exists
exports.checkCategoryExistence = async (req, res, next) => {
  try {
    const { category } = req.body;

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Middleware to check if the updated program name is unique
exports.checkUniqueUpdatedName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const programId = req.params.id;

    const existingProgram = await Program.findOne({ name });

    if (existingProgram && existingProgram._id.toString() !== programId) {
      return res
        .status(400)
        .json({ message: "Updated program name already exists" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Middleware to validate if all required fields are provided

// exports.validateRequiredFields = async (req, res, next) => {
//   const { name, description, category, price } = req.body;

//   if (!name || !description || !category || !price) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   next();
// };

exports.validateRequiredFields = (req, res, next) => {
  const { name, description, category, price } = req.body;

  if (!name || !description || !category || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  next();
};
