import express from 'express';
import { AddProduct } from '../controller/product';

const router = express.Router();

router.post('/products', AddProduct)
router.delete('/products/:id', RemoveProduct)


export default router