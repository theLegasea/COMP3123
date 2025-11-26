const employeeModel = require('../models/EmployeeModel');
const express = require('express');
const employeeRoutes = express.Router();
const { body, validationResult } = require('express-validator');

// Create Employee
employeeRoutes.post('/employees', (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const employee = new employeeModel(req.body)
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
employeeRoutes.put('/employees/:employeeId', (req, res) => {
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
// Delete Employee by query parameter
employeeRoutes.delete('/employees', (req, res) => {
    const employeeId = req.query.eid;
    if (!employeeId) {
        return res.status(400).send({ message: 'Employee ID (eid) is required' });
    }
    employeeModel.findByIdAndDelete(employeeId).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
// Search for employee by term
employeeRoutes.get('/employees/search/:term', (req, res) => {
    const searchTerm = req.params.term;
    employeeModel.find({
        // so sick
        $or: [
            { position: { $regex: searchTerm, $options: 'i' } },
            { department: { $regex: searchTerm, $options: 'i' } }
        ]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
})

module.exports = employeeRoutes;