import { Router } from "express";
import { createLog } from "../controllers/logs.controller.js";
// import { verify } from "jsonwebtoken";
import { authRequired } from "../middleware/validatorToken.js";

const router=Router()

router.post("/logs",authRequired,createLog)


export default router;