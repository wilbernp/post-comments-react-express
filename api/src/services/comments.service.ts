import { CommentModel } from "../schemas/comment.schema"
import { IComment } from "../types/comment"
import postService from "./post.service"

export default {
    create: async (comment:IComment) => {
        const findPost = await postService.getById(comment.postId)
        const commentCreated = await new CommentModel(comment).save()

        // se agrega el nuevo comentario al arreglo de comments del post correspondiente
        // para que dicho array muestre todos los comentarios en posteriores consultas al modelo de posts
        findPost?.comments?.unshift(commentCreated._id)
        await findPost?.save()

        return commentCreated
    },
    getAll: async () => {
        return await CommentModel.find()
    },

    getById: async (id:string) => {
        return await CommentModel.findById(id)
    },

}