import express from "express";
import userRoutes from "./users.mjs";
import authRoutes from "./auth.mjs";
import booksRoutes from "./books.mjs";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/books", booksRoutes);

export default router;
