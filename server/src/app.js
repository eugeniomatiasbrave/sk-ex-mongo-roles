import express from "express";
import mongoose from 'mongoose';
import SessionsRouter from './routes/SessionsRouter.js';
import ProductsRouter from './routes/products.routes.js';
import UsersRouter from './routes/users.routes.js';
import cookieParser from 'cookie-parser'; // instalar cookie-parser
import config from './config/config.js';
import {createRoles} from "./config/startRoles.js";

const app = express();
createRoles();

const PORT = config.app.PORT;

mongoose.connect(config.mongo.URL);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.json()); 
app.use(cookieParser());
app.use('/api/sessions', SessionsRouter);
app.use('/api/products', ProductsRouter);
app.use('/api/users', UsersRouter);