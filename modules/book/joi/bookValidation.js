const joi = require("joi")

module.exports = {
    addBookSchema : {
        body: joi.object().required().keys({
            title:joi.string().required(),
            author:joi.string().required(),
            year:joi.number().required(),
            description:joi.string().required(),
            price:joi.number().required(),
            createdBy:joi.string(),
            // creationdate:joi.date().required(),
            // pageCount:joi.number().required(),
            // currentRating:joi.number().required(),
            // ratingPoints:joi.number().required(),
            // ratedCount:joi.number().required(),
            // purchasesCount:joi.number().required(),
            
        }),
        files:joi.object().required(),
    },
    updateBookSchema : {
        body: joi.object().required().keys({
            title:joi.string().required(),
            author:joi.string().required(),
            year:joi.number().required(),
            description:joi.string().required(),
            price:joi.number().required(),
            // cover:joi.string().required(),
            // creationdate:joi.date().required(),
            // pageCount:joi.number().required(),
            // currentRating:joi.number().required(),
            // ratingPoints:joi.number().required(),
            // ratedCount:joi.number().required(),
            // purchasesCount:joi.number().required(),
            // createdBy:
          
        })
    }

}
