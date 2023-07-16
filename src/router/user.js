import express from 'express';
import { signUp } from '../controller/user';

const router = express.Router();

router.post("/signup", signUp)

export default router