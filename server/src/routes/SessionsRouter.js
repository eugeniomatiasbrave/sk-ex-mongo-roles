import { Router } from 'express';
import sessionsController from "../controllers/sessions.controller.js";
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';

class SessionsRouter extends Router {
    constructor() {
        super();
        this.init = () => {
            this.post('/register', sessionsController.register);
            this.post('/login', sessionsController.login);
            this.get('/logout', sessionsController.logout);
            this.get('/current', sessionsController.current);
            this.get('/admin', authenticateToken, authorizeAdmin ,sessionsController.admin);
        };
        this.init();
    }
}

export default new SessionsRouter();