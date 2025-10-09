const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get.use('/api/v1/user', userRoutes);
app.get.use('/api/v1/emp', employeeRoutes);