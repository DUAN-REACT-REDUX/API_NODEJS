import express from "express";
import { RestoreProduct, GetAllRecyclebin } from "../controller/recyclebin";

const router = express.Router();

router.get("/recyclebin/:id", RestoreProduct);
router.get("/recyclebin", GetAllRecyclebin);


export default router;