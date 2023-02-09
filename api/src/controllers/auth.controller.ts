import { Request, Response } from "express";
import authService from "../services/auth.service";
import { Login } from "../types/auth";
import { UserCreate } from "../types/user";

export default {
    register: async (req: Request, res: Response) => {
        const body = req.body as UserCreate
        console.log("body ", body)
        const newUser = await authService.register(body)
        if (!newUser) res.status(200).json({message:"user is already exists"})
        res.send(newUser)
    },
    login: async (req: Request, res: Response) => {
        const body = req.body as Login
        try {
            const user = await authService.login(body)
            res.send(user)
        } catch (error) {
            res.status(404).json({ message: "Not found" })
        }
    }
}
