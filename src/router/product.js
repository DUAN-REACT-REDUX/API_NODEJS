import express from 'express';
import { AddProduct, GetOneProduct, RemoveProduct } from '../controller/product';

const router = express.Router();

router.post('/products', AddProduct)
router.delete('/products/:id', RemoveProduct)
router.get('/products/:id', GetOneProduct)

export default router