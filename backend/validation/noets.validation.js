const Joi = require('joi')

const NotesSchemaValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

module.exports = NotesSchemaValidation