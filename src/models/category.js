const { Schema, model} = require('mongoose');

const categorySchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
}, { 
    timestamps: true, //createdAt, updatedAt
});

module.exports = model('Category', categorySchema);