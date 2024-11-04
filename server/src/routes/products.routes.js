import express from 'express';
import { authenticateToken, ADMIN, MODERATOR } from '../middleware/auth.js'; 
import productsController from '../controllers/products.controller.js'; 

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/', [authenticateToken, MODERATOR ], productsController.createProduct);
router.put('/:id', [authenticateToken, ADMIN ], productsController.updateProduct);
router.delete('/:id', [authenticateToken, ADMIN ], productsController.deleteProduct);

export default router;
