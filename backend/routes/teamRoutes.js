const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/teamcontrollers');
const errorHandlers = require('../middleware/teammiddleware');
// Route to create a new employee
router.post('/employees', employeeController.createEmployee, 
errorHandlers.createEmployeeErrorHandler);

// Route to update an existing employee
router.put('/employees/:id', employeeController.updateEmployee,
errorHandlers.updateEmployeeErrorHandler);

// Route to delete an employee
router.delete('/employees/:id', employeeController.deleteEmployee,
errorHandlers.deleteEmployeeErrorHandler);

// Route to get all employees
router.get('/employees', employeeController.getAllEmployees,
errorHandlers.getAllEmployeesErrorHandler);

// Route to get a specific employee by ID
router.get('/employees/:id', employeeController.getEmployeeById,
errorHandlers.getEmployeeByIdErrorHandler);

module.exports = router;
