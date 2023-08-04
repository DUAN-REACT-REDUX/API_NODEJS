import express from "express";
import { RestoreProduct } from "../controller/recyclebin";

const router = express.Router();

router.get("/recyclebin/:id", RestoreProduct);


export default router;