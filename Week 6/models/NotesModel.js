const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated
const noteSchema = new mongoose.Schema({
    noteTitle: { type: String, required: true },
    noteDescription: { type: String, required: true },
    priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], required: true },
    dateAdded: { type: Date},
    dateUpdated: { type: Date }
});
module.exports = mongoose.model('Notes', noteSchema);
