import express from 'express';
import { AddCategory } from '../controller/category';

const router = express.Router();

router.post('/categories', AddCategory)

export default router