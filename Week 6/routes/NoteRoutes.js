const notesModel = require('../models/NotesModel.js');
const express = require('express');
const noteRoutes = express.Router();

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
noteRoutes.post('/notes', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    note = new notesModel(req.body.content)
    note.save().then(() => {
        res.status(201).send();
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
noteRoutes.get('/notes', (req, res) => {
    //TODO - Write your code here to returns all note
    notesModel.find({}).exec().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
noteRoutes.get('/notes/:noteId', (req, res) => {
    //TODO - Write your code here to return onlt one note using noteid
    notesModel.findById(req.params.noteId).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
noteRoutes.put('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid
    notesModel.findByIdAndUpdate(req.params.noteId, req.body.content, {new: true}).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
noteRoutes.delete('/notes/:noteId', (req, res) => {
    //TODO - Write your code here to delete the note using noteid
    notesModel.findByIdAndDelete(req.params.noteId).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});

module.exports = noteRoutes;
