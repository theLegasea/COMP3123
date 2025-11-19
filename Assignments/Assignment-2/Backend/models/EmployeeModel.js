const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    "first_name": {type: String, required: true},
    "last_name": {type: String, required: true},
    "email": {type: String, required: true},
    "position": {type: String, required: true},
    "salary": {type: Number, required: true},
    "date_of_joining": Date,
    "department": {type: String, required: true},
    "created_at": Date,
    "updated_at": Date,
    "profile_image": {type: String, required: false},
});
module.exports = mongoose.model('Employee', employeeSchema);