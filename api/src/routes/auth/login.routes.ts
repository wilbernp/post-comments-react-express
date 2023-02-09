import { Router } from "express";
import authController from "../../controllers/auth.controller";


const router = Router()

// PATH ROUTES:  auth/login
router.post("/",authController.login)


export {router}