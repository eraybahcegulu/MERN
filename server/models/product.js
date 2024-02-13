const mongoose = require("mongoose");
const baseModel = require("./baseModel");

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true,
        },

        productCategory: {
            type: String,
            required: true,
            trim: true,
        },

        productAmount: {
            type: String,
            required: true,
            trim: true,
        },
        
        amountUnit: {
            type: String,
            required: true,
            trim: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },

        ...baseModel
    },
);

module.exports = mongoose.model('Product', productSchema);