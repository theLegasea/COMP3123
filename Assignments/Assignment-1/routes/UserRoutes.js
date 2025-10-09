const userModel = require('../models/UserModel');
const express = require('express');
const userRoutes = express.Router();
const { body, validationResult } = require('express-validator');

const validationRules = [
    body('username')
        .notEmpty()
        .withMessage('Username is required'),
    body('email')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    body('created_at')
        .optional()
        .isISO8601(),
    body('updated_at')
        .optional()
        .isISO8601()
]

// Signup
userRoutes.post('/signup', validationRules, (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    user = new userModel(req.body.content)
    note.save().then(() => {
        res.status(201).send();
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
        }
);
// Login
userRoutes.post('/login', validationRules, (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    user = new userModel(req.body.content)
    note.save().then(() => {
        res.status(201).send();
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});