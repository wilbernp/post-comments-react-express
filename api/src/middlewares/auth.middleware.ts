import { NextFunction, Request, Response } from "express";
import { PayloadJWT } from "../types/auth";
import jwtHandle from "../utils/jwt.handle";

export default {
    authenticate: (req: Request, res: Response, next: NextFunction) => {
        const bearerToken = req.headers.authorization
        if (!bearerToken) {
            return res.status(401).json({ message: "Please authenticate" })
        }
        const token = bearerToken.split(" ")[1]

        try {
            const decoded = jwtHandle.verifyToken(token)
            req.user = decoded as PayloadJWT
            next()
        } catch (error) {

            return res.status(401).json({ message: "Please authenticate" })
        }
    }
}