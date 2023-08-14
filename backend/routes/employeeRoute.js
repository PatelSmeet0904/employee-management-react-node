// routes/employeeRoutes.js
const router = require('express').Router();
const employeeController = require('../controllers/employeeController');

router.post('/employees', employeeController.addEmployee);
router.get('/employees', employeeController.getEmployees);
router.get('/employees/:id', employeeController.getEmployee);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;
