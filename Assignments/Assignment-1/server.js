const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/UserRoutes');
const employeeRoutes = require('./routes/EmployeeRoutes');

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/comp3123-assignment1';
const PORT = process.env.PORT || 8089;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// All the database connection stuff
connectDB(DB_URL)
    .then(() => {
        console.log('Successfully connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Could not connect to the database. Exiting now...', err);
        process.exit(1);
    });