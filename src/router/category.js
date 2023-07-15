import express from 'express';
import { AddCategory, GetALlCategory, UpdateCategory } from '../controller/category';

const router = express.Router();

router.post('/categories', AddCategory)
router.get('/categories', GetALlCategory)
router.put('/categories/:id/update', UpdateCategory)

export default router