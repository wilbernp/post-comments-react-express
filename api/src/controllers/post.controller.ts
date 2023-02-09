import { Request, Response } from "express"
import { Types } from "mongoose"
import postService from "../services/post.service"



export default {
    create: async (req: Request, res: Response) => {
        const userId = req.user.id
        const io = req.io
        const newPost = await postService.create({...req.body, author:userId})
        io.emit("new_post",newPost)
        res.send(newPost)
    },
    getAll: async (req: Request, res: Response) => {
        const allPost = await postService.getAll()
        res.send(allPost)
    },
    getById: async (req: Request, res: Response) => {
        const postId = req.params.id as unknown as Types.ObjectId
        const post = await postService.getById(postId)
        res.send(post)
    }
}