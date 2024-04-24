import {Router} from 'express';
import { crearRol, obtenerRoles } from '../controllers/rol.controller.js';

const router = Router();

router.get('/roles', obtenerRoles);
router.post('/roles', crearRol);

export default router;