import { Request, Response } from "express"
import usersService from "../services/users.service"

export default {
    getProfile: async (req: Request, res: Response) => {
        const findUser = await usersService.getById(req.user.id)
        if (!findUser) return res.status(200).json({ message: "user is not exists" })
        const { password, ...rest } = findUser.toObject()
        res.send(rest)
    }
}