const Joi = require("joi")


module.exports={
    addUserSchema:{
        body:Joi.object().required().keys({
            name:Joi.string().required(),
            email:Joi.string().required().email(),
            password:Joi.string().required(),
            role:Joi.string(),
        }),
        file:Joi.object().required(),
    },
    UpdateUserSchema:{
        body:Joi.object().required().keys({
            name:Joi.string().required(),
            email:Joi.string().required().email(),
            password:Joi.string().required(),
        }),
        file:Joi.object().required(),
    },
    signInSchema:{
        body:Joi.object().required().keys({
            email:Joi.string().required().email(),
            password:Joi.string().required(),
        }),
    }
}


