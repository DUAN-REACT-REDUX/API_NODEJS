import express from 'express';
import { AddProduct, GetAllProduct, GetOneProduct, RemoveProduct, UpdateProduct } from '../controller/product';

const router = express.Router();

router.post('/products/add', AddProduct)
router.get('/products', GetAllProduct)
router.delete('/products/:id', RemoveProduct)
router.get('/products/:id', GetOneProduct)
router.put('/products/:id/update', UpdateProduct)

export default router