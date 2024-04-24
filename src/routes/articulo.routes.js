import {Router} from 'express'
import { actualizarArticulo, crearArticulo, eliminarArticulo, obtenerArticuloPorId, obtenerArticulosPorCongreso, obtenerArticulosPorUser } from '../controllers/articulo.controller.js'
import { authRequired } from "../middleware/validatorToken.js";
import { validateSchema } from '../middleware/ValidatorMiddleware.js';
import { articuloSchema } from '../schemas.js/articulo.schema.js';

const router=Router()

router.post("/articulos/:congresoid",authRequired,validateSchema(articuloSchema),crearArticulo)

router.get("/articulos",authRequired,obtenerArticulosPorUser)
router.get("/articulos/:id",authRequired,obtenerArticuloPorId)
router.get("/articulos/congreso/:congresoid",authRequired,obtenerArticulosPorCongreso)

router.delete('/articulos/:id',authRequired,eliminarArticulo)
router.put('/articulos/:id',authRequired,actualizarArticulo)

export default router