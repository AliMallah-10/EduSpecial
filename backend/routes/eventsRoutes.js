const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");
const eventsMiddleware = require("../middlewares/eventsMiddleware"); // Import the events middleware
const userMiddleware = require("../middlewares/usermiddleware");
// Private routes (require token authentication)
router.use(userMiddleware.verifyToken);
// Route to create a new event
router.post(
  "/addevent",
  eventsMiddleware.validateEvent,
  eventsController.createEvent
);

// Route to get all events
router.get("/getallevents", eventsController.getAllEvents);

// Route to get an event by ID
router.get("/getevent/:id", eventsController.getEventById);

// Route to update an event by ID
router.put(
  "/updateevent/:id",
  eventsMiddleware.validateEvent,
  eventsController.updateEventById
);

// Route to delete an event by ID
router.delete("/deleteevent/:id", eventsController.deleteEventById);

module.exports = router;
