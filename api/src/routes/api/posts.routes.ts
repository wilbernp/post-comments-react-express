import { Router } from "express";
import commentsController from "../../controllers/comments.controller";
import postController from "../../controllers/post.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router()

// PATH ROUTES: api/posts
router.use(authMiddleware.authenticate)
router.post("/",postController.create)
router.post("/:postId/comments",commentsController.create)
router.get("/",postController.getAll)
router.get("/:id",postController.getById)

export {router}