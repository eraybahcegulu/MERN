const mongoose = require("mongoose");
const BaseModel = require("./baseModel");

const ProductSchema = mongoose.Schema(
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

        ...BaseModel
    },
);

module.exports = mongoose.model('Product', ProductSchema);