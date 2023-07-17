import express from 'express';
import { AddComment } from '../controller/comment';

const router = express.Router();

router.post("/comments/add", AddComment)

export default router