import { Router } from "express";
import { authRequired } from "../middleware/validatorToken.js";
import { eliminarMembresia, obtenerMembresias } from "../controllers/membresias.controller.js";
// import { crearAsignacion, eliminarAsignacion, obtenerAsignaciones } from "../controllers/asignaciones.controller.js";


const router=Router()


router.get("/membresias/:id",authRequired,obtenerMembresias)
router.delete("/membresias/:id",authRequired,eliminarMembresia)




export default router;