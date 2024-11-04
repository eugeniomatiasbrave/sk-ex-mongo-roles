 import { productsService } from "../managers/index.js";


   const getProducts = async (req, res) => {
        try {
            const products = await productsService.getProducts();
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving products' });
        }
    }

	const getProductById = async (req, res) => {

        try {
            const product = await productsService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving product' });
        }
    }

	const createProduct = async (req, res) => {

        const product = req.body;

        try {
            const newProduct = await productsService.createProduct(product);
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(500).json({ message: 'Error creating product' });
        }
    }

	const updateProduct = async (req, res) => {
        try {
            const updatedProduct = await productsService.updateProduct(req.params.id, req.body);
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (err) {
            res.status(500).json({ message: 'Error updating product' });
        }
    }

	const deleteProduct = async (req, res) => {
        try {
            const deletedProduct = await productsService.deleteProduct(req.params.id);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting product' });
        }
    }

export default {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct
};