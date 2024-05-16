import express from "express";
import { openaiController } from "./../Controller/openaiController.js";
const aiRouter = express.Router();

aiRouter.post("/openai", openaiController);

export default aiRouter;
