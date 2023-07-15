import express from 'express';
import { AddCategory, GetALlCategory } from '../controller/category';

const router = express.Router();

router.post('/categories', AddCategory)
router.get('/categories', GetALlCategory)

export default router