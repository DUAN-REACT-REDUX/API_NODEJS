import express from 'express';
import { AddCategory, GetALlCategory, UpdateCategory, getOneCategory } from '../controller/category';

const router = express.Router();

router.post('/categories/add', AddCategory)
router.get('/categories', GetALlCategory)
router.get('/categories/:id', getOneCategory)
router.put('/categories/:id/update', UpdateCategory)

export default router