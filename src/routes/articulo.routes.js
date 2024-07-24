import {Router} from 'express'
import { actualizarArticulo, crearArticulo, eliminarArticulo, obtenerArticuloPorId, obtenerArticulosPorAsignacion, obtenerArticulosPorCongreso, obtenerArticulosPorUser, obtenerVistaCompletaArticulo } from '../controllers/articulo.controller.js'
import { authRequired } from "../middleware/validatorToken.js";
import { validateSchema } from '../middleware/ValidatorMiddleware.js';
import { articuloSchema } from '../schemas.js/articulo.schema.js';

const router=Router()

router.post("/articulos/:congresoid",authRequired,validateSchema(articuloSchema),crearArticulo)

router.get("/articulos",authRequired,obtenerArticulosPorUser)
router.get("/articulos/:id",authRequired,obtenerArticuloPorId)
router.get("/articulos/congreso/:congresoid",authRequired,obtenerArticulosPorCongreso)
router.get("/articulos/revisor/:congresoid",authRequired,obtenerArticulosPorAsignacion)
router.get('/articulos/:id/vista-completa',obtenerVistaCompletaArticulo)

router.put('/articulos/:id',authRequired,actualizarArticulo)
router.delete('/articulos/:id',authRequired,eliminarArticulo)




export default router