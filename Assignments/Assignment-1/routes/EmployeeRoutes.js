const employeeModel = require('../models/EmployeeModel');
const express = require('express');
const employeeRoutes = express.Router();

// Create Employee
employeeRoutes.post('/employees', (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Fields must not be empty"
        });
    }
    employee = new employeeModel(req.body.content)
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
    if (!req.body.content) {
        return res.status(400).send({
            message: "Fields must not be empty"
        });
    }
    employeeModel.findByIdAndUpdate(req.params.employeeId, req.body.content, { new: true }).then(data => {
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