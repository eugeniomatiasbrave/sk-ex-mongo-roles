import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import { authenticateToken, ADMIN } from '../middleware/auth.js'; 

const router = Router();

// users routes
router.post('/', [ authenticateToken, ADMIN], usersController.createUser);///api/users/

export default router;