import { Router } from "express";
import { authRequired } from "../middleware/validatorToken.js";
// import { crearAsignacion, eliminarAsignacion, obtenerAsignaciones } from "../controllers/asignaciones.controller.js";


const router=Router()


router.get("/membresias/:id",authRequired)
router.delete("/asignaciones/:id",authRequired)


export default router;