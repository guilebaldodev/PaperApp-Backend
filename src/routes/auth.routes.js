import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validateSchema } from "../middleware/ValidatorMiddleware.js";
import { registerSchema,loginSchema } from "../schemas.js/auth.schema.js";

const router=Router()

router.post("/register",validateSchema(registerSchema),register)
router.post("/login",validateSchema(loginSchema),login)


export default router;