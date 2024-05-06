import { Router } from "express";
import { authRequired } from "../middleware/validatorToken.js";
import { crearComentario, eliminarComnetario, obtenerComentarios } from "../controllers/comentarios.controller.js";

const router=Router()

router.get("/comentarios/:id",authRequired,obtenerComentarios)
router.post("/comentarios/:id",authRequired,crearComentario)
router.delete("/comentarios/:id",authRequired,eliminarComnetario)

export default router;