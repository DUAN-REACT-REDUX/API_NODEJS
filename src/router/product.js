import express from 'express';
import { AddProduct, GetAllProduct, GetOneProduct, RemoveProduct, UpdateProduct, searchProduct, searchProductByCategory } from '../controller/product';

const router = express.Router();

router.post('/products/add', AddProduct)
router.get('/products', GetAllProduct)
router.get('/products/search', searchProduct)
router.get('/products/searchByCategory', searchProductByCategory)
router.delete('/products/:id', RemoveProduct)
router.get('/products/:id', GetOneProduct)
router.put('/products/:id/update', UpdateProduct)


export default router