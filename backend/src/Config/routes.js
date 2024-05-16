import express from "express";
import users from "../Routes/userRoutes.js";

const router = express.Router();
router.use("/users", users);

export default router;
