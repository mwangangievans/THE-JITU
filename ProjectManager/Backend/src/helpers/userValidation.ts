
import Joi from 'joi'

export const UserSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required()
})

export const UserSchema2 = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),

})

export const ProjectSchema = Joi.object({
    project_name: Joi.string().required(),
    project_description: Joi.string().required(),
    completion_date: Joi.date().required()

})