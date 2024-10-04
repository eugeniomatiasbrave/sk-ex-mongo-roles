import express from "express";
import productsRouter from "./routes/products.router.js";
import mongoose from 'mongoose';
import config from './config/config.js';

const app = express();
const PORT = config.app.PORT;

mongoose.connect(config.mongo.URL);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.json()); 
app.use('/api/products', productsRouter);