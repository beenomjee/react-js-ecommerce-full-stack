import express from "express";
import { authMiddleware, adminMiddleware } from "../middlewares/index.js";
import {
  getMyOrders,
  getAllOrders,
  deleteOrder,
  updateOrder,
} from "../controllers/index.js";

const router = express.Router();

router.get("", adminMiddleware, getAllOrders);

// Update an order by ID
router.put("/:id", adminMiddleware, updateOrder);

router.delete("/:id", adminMiddleware, deleteOrder);

router.get("/get-my-orders", authMiddleware, getMyOrders);

export default router;
