import { Router } from "express";
import { authRequired } from "../middleware/validatorToken.js";
import { crearAsignacion, eliminarAsignacion, obtenerAsignaciones } from "../controllers/asignaciones.controller.js";


const router=Router()


router.get("/asignaciones/:id",authRequired,obtenerAsignaciones)
router.post("/asignaciones/:id",authRequired,crearAsignacion)
router.delete("/asignaciones/:id",authRequired,eliminarAsignacion)


export default router;