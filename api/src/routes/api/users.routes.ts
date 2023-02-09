import { Router } from "express";
import usersController from "../../controllers/users.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router()

// PATH ROUTES: api/users

// /profile/:id
router.use(authMiddleware.authenticate)
router.get("/profile",usersController.getProfile)


export {router}