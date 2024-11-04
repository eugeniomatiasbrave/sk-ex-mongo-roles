import express from 'express';
import { authenticateToken, ADMIN } from '../middleware/auth.js'; 
import productsController from '../controllers/products.controller.js'; 

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/', [authenticateToken, ADMIN], productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;
