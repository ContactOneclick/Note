const notes = require('../models/notes')
const mongoose = require('mongoose')
const NoteSchemaValidation = require('../validation/noets.validation')
const { HTTP_INTERNAL_SERVER_ERROR_500, HTTP_BAD_REQUEST_400 } = require('../utils/http.status')
const { successResponse, errorResponse } = require('../utils/commonResponse')


exports.getNotes = async function (req, res) {
    const noteData = await notes.find()
    return successResponse(res, noteData, 'Notes Fetched Successfully.')
}

exports.getNoteById = async function (req, res) {
    try {
        const noteId = new mongoose.Types.ObjectId(req.params.id)
        const noteData = await notes.findById(noteId)
        return successResponse(res, noteData, 'Note Fetched Successfully.')
    } catch (error) {
        return errorResponse(res, 'error', error.message, HTTP_INTERNAL_SERVER_ERROR_500)
    }
}

exports.saveNoteDetails = async (req, res) => {
    const requestBody = req.body

    try {
        await NoteSchemaValidation.validateAsync(requestBody)
    } catch (error) {
        return errorResponse(res, 'error', error.message, HTTP_BAD_REQUEST_400)
    }

    try {
        const noteData = {
            title: requestBody.title,
            description: requestBody.description
        }
        const note = new notes(noteData)

        await note.save()

        return successResponse(res, {}, 'Note Added Successfully.')
    } catch (error) {
        return errorResponse(res, 'error', error.message, HTTP_INTERNAL_SERVER_ERROR_500)
    }
}

exports.updateNoteById = async (req, res) => {
    const requestBody = req.body
    const noteId = req.params.id

    try {
        await NoteSchemaValidation.validateAsync(requestBody)
    } catch (error) {
        return errorResponse(res, 'error', error.message, HTTP_BAD_REQUEST_400)
    }

    try {
        const updatedNoteData = {
            $set: {
                title: requestBody.title,
                description: requestBody.description
            }
        }
        const query = { _id: noteId }
        await notes.updateOne(query, updatedNoteData)


        return successResponse(res, {}, 'Note Updated Successfully.')
    } catch (error) {
        return errorResponse(res, 'error', error.message, HTTP_INTERNAL_SERVER_ERROR_500)
    }
}

exports.deleteNoteById = async function (req, res) {
    try {
        const noteId = new mongoose.Types.ObjectId(req.params.id)
        console.log(noteId)
        const noteData = await notes.deleteOne({ _id: noteId })
        return successResponse(res, noteData, 'Notes Deleted Successfully.')
    } catch (error) {
        console.log('error', error)
        return errorResponse(res, 'error', error.message, HTTP_INTERNAL_SERVER_ERROR_500)
    }
}
