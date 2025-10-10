const employeeModel = require('../models/EmployeeModel');
const express = require('express');
const employeeRoutes = express.Router();
const { body, validationResult } = require('express-validator');

const validationRules = [
    body('first_name')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ max: 50 }),
    body('last_name')
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ max: 50 }),
    body('email')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('position')
        .notEmpty()
        .withMessage('Position is required')
        .isLength({ max: 100 }),
    body('salary')
        .isFloat({ min: 0 })
        .withMessage('Must be a positive number'),
    body('date_of_joining')
        .notEmpty()
        .withMessage('Date of joining is required')
        .isISO8601(),
    body('department')
        .notEmpty()
        .withMessage('Department is required')
        .isLength({ max: 100 }),
    body('created_at')
        .optional()
        .isISO8601(),
    body('updated_at')
        .optional()
        .isISO8601()
]

// Create Employee
employeeRoutes.post('/employees', validationRules, (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    employee = new employeeModel(req.body)
    employee.save().then(() => {
        res.status(201).send();
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});

// Get all Employees
employeeRoutes.get('/employees', (req, res) => {
    employeeModel.find({}).exec().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
// Get Employee by ID
employeeRoutes.get('/employees/:employeeId', (req, res) => {
    employeeModel.findById(req.params.employeeId).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
// Update Employee by ID
employeeRoutes.put('/employees/:employeeId', validationRules, (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Fields must not be empty"
        });
    }
    employeeModel.findByIdAndUpdate(req.params.employeeId, req.body, { new: true }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
// Delete Employee by ID
employeeRoutes.delete('/employees/:employeeId', (req, res) => {
    employeeModel.findByIdAndDelete(req.params.employeeId).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});

module.exports = employeeRoutes;