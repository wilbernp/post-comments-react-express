import { Request, Response } from "express"
import { Types } from "mongoose"
import commentsService from "../services/comments.service"
import { IComment, ICommentBody } from "../types/comment"

export default {
    create: async (req: Request, res: Response) => {

        const body = req.body as ICommentBody
        const postId = req.params.postId as unknown as Types.ObjectId
        const userId = req.user.id

        const comment:IComment = {
            content:body.content,
            author:userId,
            postId
        }

        const newComment = await commentsService.create(comment)
        res.send(newComment)
    }
}