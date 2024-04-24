import { Router } from "express";
import { authRequired } from "../middleware/validatorToken";
import { actualizarAutor, crearAutor, eliminarAutor, obtenerAutores } from "../controllers/autor.controller";

const router=Router()

router.get("/autores/:articuloid",authRequired,obtenerAutores)
router.post("/autores/:articuloid",authRequired,crearAutor)
router.put("/autores/:id",authRequired,actualizarAutor)
router.delete("/autores/:id",authRequired,eliminarAutor)



export default router;