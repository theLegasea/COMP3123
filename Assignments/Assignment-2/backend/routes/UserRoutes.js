const userModel = require('../models/UserModel');
const express = require('express');
const userRoutes = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'localTestKey'

// Signup
userRoutes.post('/signup', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Fields must not be empty"
        });
    }
    const user = new userModel(req.body)
    // Hash password - not working yet
    user.save().then(() => {
        res.status(201).send({
            message: "User created",
            userId: user._id,
            username: user.username,
            email: user.email
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
// Login
userRoutes.post('/login', async (req, res) => {
    try{
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Username and password are required"
        });
    }
    // TODO: switch this to compare hashed pass
    const user = await userModel.findOne({username: req.body.username});
    if (user.password && req.body.password !== user.password) {
        return res.status(401).send({
            message: "Invalid password"
        });
    }
    const token = jwt.sign(
        {
            userId: user._id,
            username: user.username
        },
        JWT_SECRET,
        {expiresIn: '1h'}
    );
    return res.status(200).json({
        message: "Login successful",
        token,
        user: {
            userId: user._id,
            username: user.username,
            email: user.email
        }
    });
    } catch (err) {
        return res.status(500).send({
            message: err.message
        });
    }
});


    module.exports = userRoutes;