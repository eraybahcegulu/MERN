const Product = require("../models/product");
const status = require("../models/enums/status");
const responseHandler = require('../handlers/responseHandler');


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: status.ACTIVE })
            .populate({
                path: 'company',
            })

        return responseHandler.ok(res, products);
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};


const addProduct = async (req, res, next) => {
    try {
        const existingProductNameControl = await Product.findOne({ productName: req.body.productName.trim(), status: status.ACTIVE, company: req.body.company.trim() });
        if (existingProductNameControl) {

            existingProductNameControl.productAmount = Number(existingProductNameControl.productAmount) + Number(req.body.productAmount)
            await existingProductNameControl.save();
            responseHandler.ok(res, { message: 'The product is already registered for this company. New amount added' });
            return next();
        }

        const newProduct = new Product(req.body);
        await newProduct.save();

        responseHandler.created(res, { message: 'Product added successfully.' });
        next();
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.body.userId;

    try {
        const product = await Product.findById(id, { status: status.ACTIVE });

        if (!product) {
            return responseHandler.notFound(res, 'Product not found.');
        }

        product.status = status.DELETED;
        product.lastDeleterId = userId;

        await product.save();

        responseHandler.ok(res, { message: 'Product deleted successfully.' });
        next();
    } catch (error) {
        console.error('Error', error);
        return responseHandler.notFound(res, 'Server error');
    }
};

const updateProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const existingProductNameControl = await Product.findOne({ productName: req.body.productName.trim(), status: status.ACTIVE, company: req.body.company.trim(), _id: { $ne: id } });
        if (existingProductNameControl) {
            return responseHandler.badRequest(res, "Failed. This Product Name is already registered for this Company");
        }

        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return responseHandler.notFound(res, 'Product not found.');
        }

        req.firstData = existingProduct;

        await Product.findByIdAndUpdate(id, req.body);
        responseHandler.ok(res, { message: 'Product updated successfully.' });
        next();
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct
};
