import { Router } from "express";
import { productsService } from "../managers/index.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = await productsService.getProducts();
        if (!products) {
            return res.status(400).json({ status: "error", error: 'Error al obtener los productos' });
        }
        res.json({ status: "success", payload: products });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});


//Endpoint para crear una producto.
router.post('/', async (req, res) => {
    const { code, name, presentation, price } = req.body;

    if (isNaN(price)) {
        return res.status(400).send({ status: "error", error: 'Error, is not a number' });
    };

    if (!name || !presentation || !price || !code) {
        return res.status(400).send({ status: "error", error: 'Error Data ' }); //   
    };

    try {
        const newProduct = {
            code,
            name,
            presentation,
            price  
        };

        const result = await productsService.createProduct(newProduct);

        if (!result) {
            return res.status(500).send({ status: "error", error: 'Error' });
        }

        res.json({ status: "success", message: 'Product created', payload: result }); // data: result es el producto creado.

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error: error });
    }
});


router.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        const product = await productsService.getProductById(pid);

        if (!product) {
            return res.status(404).send({ status: "error", error: 'El producto que intentas borrar no existe' });
        }

        const deletedProduct = await productsService.deleteProduct(pid);

        if (!deletedProduct) {
            return res.status(500).send({ status: "error", error: 'Error al borrar el producto' });
        }

        res.send({ status: "success", data: deletedProduct });

    } catch (error) {
        console.error('Error al borrar el producto:', error);
        res.status(500).send({ status: "error", error: 'Hubo un problema al intentar borrar el producto' });
    }
});

router.get('/:pid', async (req, res) => {
    const {pid} = req.params;

    try {
        const product = await productsService.getProductById(pid);

        if (!product) {
            return res.status(404).send({ status: "error", error: 'Producto no encontrado' });
        }

        res.json({ status: "success", data: product });

    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send({ status: "error", error: 'Error al obtener el producto' });
    }
}
);

router.put('/:pid', async (req, res) => { // esta correcto: 27/09 8:02 am , no cambiar
    try {
        const { pid } = req.params;
        const updateData = req.body;

        if (!updateData.name || !updateData.presentation || !updateData.price || !updateData.code) {
            return res.status(400).send({ status: "error", error: 'Faltan datos para actualizar el producto' });
        }
        // Númerico y positivo
        if (updateData.price && isNaN(updateData.price) || updateData.price < 0) {
            return res.status(400).send({ status: "error", error: 'El precio debe ser un número positivo' });
        }
        const result = await productsService.updateProduct(pid, updateData);

        if (result === -1) {
            return res.status(500).send({ status: "error", error: 'Error al actualizar el producto' });
        }
        const updatedProduct = await productsService.getProductById(pid);
        res.json({ status: "success", message: `Producto actualizado id: ${pid}`, data: updatedProduct });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send({ status: "error", error: 'Error al actualizar el producto' });
    }
});

export default router;