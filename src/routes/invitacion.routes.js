import { Router } from "express";
import { authRequired } from "../middleware/validatorToken.js";
import { aceptarInvitacion, crearInvitacion, eliminarInvitacion, obtenerInvitaciones } from "../controllers/invitacion.controller.js";
// import { crearComentario, eliminarComnetario, obtenerComentarios } from "../controllers/comentarios.controller.js";

const router=Router()

router.post("/invitaciones/:id",authRequired,crearInvitacion)
router.delete("/invitaciones/:id",authRequired,eliminarInvitacion)
router.get("/invitaciones/:id",authRequired,obtenerInvitaciones)
router.post("/invitaciones/nueva/:id",authRequired,aceptarInvitacion)

// router.post("/comentarios/:id",authRequired,crearComentario)

export default router;