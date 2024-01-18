// errorHandlers.js

// Middleware for createEmployee
const createEmployeeErrorHandler = (err, req, res, next) => {
    console.error('Error creating employee:', err);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
  
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  // Other middleware functions for other controllers can be defined similarly.
  
  // Middleware for updateEmployee
const updateEmployeeErrorHandler = (err, req, res, next) => {
    console.error('Error updating employee:', err);
  
    // Customize error handling based on the specific needs of this controller
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  module.exports = {
    updateEmployeeErrorHandler,
  };

  // Middleware for deleteEmployee
const deleteEmployeeErrorHandler = (err, req, res, next) => {
    console.error('Error deleting employee:', err);
  
    // Customize error handling based on the specific needs of this controller
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  module.exports = {
    deleteEmployeeErrorHandler,
  };

  // Middleware for getAllEmployees
const getAllEmployeesErrorHandler = (err, req, res, next) => {
    console.error('Error fetching employees:', err);
  
    // Customize error handling based on the specific needs of this controller
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  module.exports = {
    getAllEmployeesErrorHandler,
  };

// Middleware for getEmployeeById
const getEmployeeByIdErrorHandler = (err, req, res, next) => {
    console.error('Error fetching employee:', err);
  
    // Customize error handling based on the specific needs of this controller
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  module.exports = {
    getEmployeeByIdErrorHandler,
  };
  