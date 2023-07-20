import express from "express";
import {
  AddProduct,
  GetAllProduct,
  GetOneProduct,
  RemoveProduct,
  RestoreProduct,
  UpdateProduct,
  searchProduct,
  searchProductByCategory,
} from "../controller/product";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.post("/products/add", checkPermission, AddProduct);
router.get("/products", GetAllProduct);
router.get("/products/search", searchProduct);
router.get("/products/searchByCategory", searchProductByCategory);
router.delete("/products/:id", RemoveProduct);
router.patch("/products/:id/restore", RestoreProduct);
router.get("/products/:id",GetOneProduct );
router.put("/products/:id/update", UpdateProduct);

export default router;
