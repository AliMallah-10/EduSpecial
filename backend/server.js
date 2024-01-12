const express = require("express");
const app = express();
const cors = require("cors");
const bodyparse = require("body-parser");
const { mongoose, models } = require("./config/config");
const user = require("./models/user");
const categorySchema = require("./models/category");
// Connect to the specific database in the Atlas cluster
const databaseName = "MernProject"; // Replace with your actual database name
const URI = `${process.env.MONGODB_URI}`;

// Use the mongoose instance from config.js
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log(`Connected to MongoDB Atlas - Database: ${databaseName}`);
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: true }));
app.post("/addDocument", async (req, res) => {
  try {
    // Extract data from the request body
    const { role, firstname, lastname, bloodType, password, email } = req.body;

    // Check if both username and password are provided
    // if (!username || !password) {
    //   return res.status(400).send("Both username and password are required");
    // }

    // Create a new document using the NewCollectionModel with data from the request body
    const newDocument = new user({
      role: role,
      firstname: firstname,
      lastname: lastname,
      bloodType: bloodType,
      password: password,
      email: email,
    });

    // Save the document to the new collection
    await newDocument.save();

    res.send("Document saved successfully!");
  } catch (error) {
    console.error("Error in server:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Access environment variables
const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Good app listening on port ${port}`);
});

module.exports = app;
