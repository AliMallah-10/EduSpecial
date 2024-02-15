const Program = require("../models/program");
const Category = require("../models/category");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

// Upload middleware
const upload = multer({ storage: storage }).single("image");

// Controller function to add a new program
exports.addProgram = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { name, description, category, price } = req.body;
      const image = req.file.filename;

      const newProgram = new Program({
        name,
        description,
        category,
        price,
        image,
      });

      await newProgram.save();
      res.json({ message: "Program added successfully" });
    });
  } catch (error) {
    console.error("Error adding program:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Function to get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();

    res.status(200).json(programs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get a program by ID
exports.getProgramById = async (req, res) => {
  try {
    const programId = req.params.id;

    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({ program });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get a program by name
exports.getProgramByName = async (req, res) => {
  try {
    const { name } = req.params;

    const program = await Program.findOne({ name });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({ program });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get programs by category
exports.getProgramsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.category;

    // Check if the category exists
    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if there are programs in the category
    const programs = await Program.find({ category: categoryId });

    if (programs.length === 0) {
      return res
        .status(404)
        .json({ message: "No programs found in this category" });
    }

    res.status(200).json(programs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update program by ID
exports.updateProgramById = async (req, res) => {
  try {
    // Call the upload middleware to handle the image upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const programId = req.params.id;
      const { name, description, category, price } = req.body;
      const updateFields = { name, description, category, price };

      // If there is a new file, update the image field
      if (req.file) {
        updateFields.image = req.file.filename;
      }

      const updatedProgram = await Program.findByIdAndUpdate(
        programId,
        updateFields,
        { new: true }
      );
      
      if (!updatedProgram) {
        return res.status(404).json({ message: "Program not found" });
      }

      res.status(200).json({ message: "Program updated successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Function to update a program by name with file upload
exports.updateProgramByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { description, category, talent, price } = req.body;

    const program = await Program.findOne({ name });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Update program fields
    program.description = description || program.description;
    program.category = category || program.category;
    program.talent = talent || program.talent;
    program.price = price || program.price;

    // Check if a new image file is uploaded
    if (req.file) {
      program.image = req.file.path;
    }

    // Save the updated program
    await program.save();

    res.status(200).json({ message: "Program updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a program by ID
exports.deleteProgramById = async (req, res) => {
  try {
    const programId = req.params.id;

    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    await program.deleteOne();

    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a program by name
exports.deleteProgramByName = async (req, res) => {
  try {
    const { name } = req.params;

    const program = await Program.findOne({ name });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    await program.deleteOne();

    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
