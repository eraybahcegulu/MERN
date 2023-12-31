const Product = require("../models/product");
const Status = require("../models/enums/status");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: Status.ACTIVE })
            .populate({
                path: 'company',
                select: 'companyName',
            })

        console.log(products);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};


const addProduct = async (req, res) => {
    try {
        const existingProductNameControl = await Product.findOne({ productName: req.body.productName, status: Status.ACTIVE, company: req.body.company });
        if (existingProductNameControl) {
            return res.status(400).json({ message: `Failed. This Product Name is already registered for this Company` });
        }

        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json({ message: "Product added successfully." });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id, { status: Status.ACTIVE });
        product.status = Status.DELETED;

        await product.save();

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const existingProductNameControl = await Product.findOne({ productName: req.body.productName, status: Status.ACTIVE, company: req.body.company, _id: { $ne: id } });
        if (existingProductNameControl) {
            return res.status(400).json({ message: "Failed. This Product Name is already registered for this Company" });
        }

        await Product.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Product updated successfully." });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct
};
