const mongoose = require("mongoose");
const BaseModel = require("./baseModel");

const ProductSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },

        productCategory: {
            type: String,
            required: true,
        },

        productAmount: {
            type: Number,
            required: true,
        },
        amountUnit: {
            type: String,
            required: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        ...BaseModel
    },
);

module.exports = mongoose.model('Product', ProductSchema);