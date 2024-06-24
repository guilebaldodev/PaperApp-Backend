import { Router } from "express";
import { authRequired } from "../middleware/validatorToken.js";
import { crearAsignacion, crearAsignaciones, eliminarAsignacion, obtenerAsignaciones } from "../controllers/asignaciones.controller.js";


const router=Router()


router.get("/asignaciones",authRequired,obtenerAsignaciones)
router.post("/asignaciones/:id",authRequired,crearAsignacion)
router.post("/asignaciones/multi/:id",authRequired,crearAsignaciones)
router.delete("/asignaciones/:id",authRequired,eliminarAsignacion)


export default router;