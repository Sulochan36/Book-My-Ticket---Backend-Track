import express from "express";
import * as controller from "./auth.controller.js";
import { authMiddleware } from "./auth.middleware.js";

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", authMiddleware, controller.getMe);

export default router;