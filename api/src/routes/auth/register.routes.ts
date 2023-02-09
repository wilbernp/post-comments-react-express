import { Router } from "express";
import authController from "../../controllers/auth.controller";


const router = Router()

// PATH ROUTES:  auth/register
router.post("/",authController.register)


export {router}