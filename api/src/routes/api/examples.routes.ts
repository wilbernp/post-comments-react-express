import { Router } from "express";
import exampleController from "../../controllers/example.controller";

const router = Router()

// PATH ROUTES: api/exampĺes
router.post("/",exampleController.create)
router.get("/",exampleController.getAll)
router.get("/:id",exampleController.getById)
router.put("/:id",exampleController.update)
router.delete("/:id",exampleController.delete)

export {router}