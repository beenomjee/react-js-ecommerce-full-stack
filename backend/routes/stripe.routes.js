import express from "express";
import {
  checkValidityOfPayment,
  initiatePayment,
} from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();
router.post("/initiate-payment", authMiddleware, initiatePayment);
router.post("/check-validity", authMiddleware, checkValidityOfPayment);

export default router;
