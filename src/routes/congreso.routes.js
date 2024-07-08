import { Router } from "express";
import { obtenerCongresoPorId,obtenerCongresos,crearCongreso,editarCongreso,eliminarCongreso, invitacionCongreso, obtenerVistaCompletaCongreso } from "../controllers/congreso.controller.js";
import { authRequired } from "../middleware/validatorToken.js";
import { validateSchema } from "../middleware/ValidatorMiddleware.js";
import { congresoSchema } from "../schemas.js/congreso.schema.js";

const router=Router()

router.get('/congresos',authRequired,obtenerCongresos)
router.get('/congresos/:id',obtenerCongresoPorId)
router.get('/congresos/:id/vista-completa',obtenerVistaCompletaCongreso)

router.post('/congresos',authRequired,validateSchema(congresoSchema),crearCongreso)
router.post('/congresos/invitacion/:id',authRequired,invitacionCongreso)
router.put('/congresos/:id',authRequired,editarCongreso)
router.delete('/congresos/:id',authRequired,eliminarCongreso)


export default router;