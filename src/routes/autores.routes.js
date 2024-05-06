import { Router } from "express";
import { authRequired } from "../middleware/validatorToken.js";
import { actualizarAutor, crearAutor, eliminarAutor, obtenerAutorPorArticuloId, obtenerAutorPorId } from "../controllers/autor.controller.js";
import { validateSchema } from "../middleware/ValidatorMiddleware.js";
import { autorSchema } from "../schemas.js/autor.schema.js";

const router=Router()

router.get("/autores/:id",authRequired,obtenerAutorPorId)
router.get("/autores/articulos/:id",authRequired,obtenerAutorPorArticuloId)

router.post("/autores/:articuloid",authRequired,validateSchema(autorSchema),crearAutor)
router.put("/autores/:id",authRequired,actualizarAutor)
router.delete("/autores/:id",authRequired,eliminarAutor)



export default router;