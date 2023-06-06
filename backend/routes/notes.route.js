const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notes.controller')

router.get('/', notesController.getNotes);
router.get('/:id', notesController.getNoteById);
router.post('/', notesController.saveNoteDetails);
router.put('/:id', notesController.updateNoteById);
router.delete('/:id', notesController.deleteNoteById);

module.exports = router