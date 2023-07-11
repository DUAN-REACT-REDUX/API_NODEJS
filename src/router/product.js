import express from 'express';
import { AddProduct } from '../controller/product';

const router = express.Router();

router.post('/products', AddProduct)

export default router