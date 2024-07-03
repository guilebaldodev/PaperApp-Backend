import { Router } from "express";
import { login, register, verifyAuth } from "../controllers/auth.controller.js";
import { validateSchema } from "../middleware/ValidatorMiddleware.js";
import { registerSchema,loginSchema } from "../schemas.js/auth.schema.js";
// import { verify } from "jsonwebtoken";

const router=Router()

router.post("/register",validateSchema(registerSchema),register)
router.post("/login",validateSchema(loginSchema),login)
router.get("/verify",verifyAuth)


export default router;