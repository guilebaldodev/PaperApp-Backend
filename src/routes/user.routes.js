import { Router } from "express"
import {getUserInfo, getUsers} from '../controllers/user.controller.js'
import { authRequired } from "../middleware/validatorToken.js";
const router=Router()

router.get('/usuarios', getUsers);
router.get('/usuarios/:id',authRequired,getUserInfo)


export default router;