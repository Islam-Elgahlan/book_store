const Joi = require('joi');


module.exports={
    addCartSchema: {
        body:Joi.object().required().keys({
            // totalPrice:Joi.number(),
            user:Joi.string(),
            // books:Joi.string(),
           
        })
    }
}