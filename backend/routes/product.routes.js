import express from "express";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  searchProduct,
  updateProduct,
  createProduct,
  getProductsForHomePage,
  getProducts,
} from "../controllers/index.js";
import { adminMiddleware } from "../middlewares/index.js";

const router = express.Router();
router.post("", adminMiddleware, createProduct);
router.get("", getAllProducts);
router.get("/search", searchProduct);
router.get("/getProductsForHomePage", getProductsForHomePage);
router.get("/getProducts", getProducts);
router.get("/:id", getProductById);
router.put("/:id", adminMiddleware, updateProduct);
router.delete("/:id", adminMiddleware, deleteProduct);

export default router;
