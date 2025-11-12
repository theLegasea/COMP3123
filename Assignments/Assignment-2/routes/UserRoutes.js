const userModel = require('../models/UserModel');
const express = require('express');
const userRoutes = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Signup
userRoutes.post('/signup', (req, res) => {
    if( !req.body) {
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
userRoutes.post('/login', (req, res) => {
    if( !req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Username and password are required"
        });
    }
    userModel.findOne({ username: req.body.username }).then(user => {
        if (!user) {
            return res.status(401).send({
                message: "Bad Username"
            });
        }
        // hash
        //const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        //if (!passwordIsValid) {
        //    return res.status(401).send({
        //        message: "Bad Password"
        //    });}
        
        res.status(200).send({
            message: "Login successful"
        });
    });
});

module.exports = userRoutes;