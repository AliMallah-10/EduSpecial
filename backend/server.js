const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/config");

// Import user routes
const userRoutes = require("./routes/userRoutes");
const programRoutes = require("./routes/programRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const peopleRoutes = require("./routes/peopleRoutes");
const eventsRoutes = require("./routes/eventsRoutes");
const teamRoutes = require("./routes/teamRoutes");
const donation = require("./routes/donationRoutes");
const registerProg = require("./routes/registerProgramRoutes");
// Middleware
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use user routes
app.use("/users", userRoutes);
app.use("/program", programRoutes);
app.use("/category", categoryRoutes);
app.use("/people", peopleRoutes);
app.use("/events", eventsRoutes);
app.use("/team", teamRoutes);
app.use("/donate", donation);
app.use("/registerProgam", registerProg);

// Access environment variables
const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Good app listening on port ${port}`);
});

module.exports = app;
