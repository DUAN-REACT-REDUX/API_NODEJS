import express from 'express';
import { AddProduct, GetOneProduct, RemoveProduct, UpdateProduct } from '../controller/product';

const router = express.Router();

router.post('/products', AddProduct)
router.delete('/products/:id', RemoveProduct)
router.get('/products/:id', GetOneProduct)
router.put('/products/:id/update', UpdateProduct)

export default router