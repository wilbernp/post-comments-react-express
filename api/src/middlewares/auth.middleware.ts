import { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
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
    },
    socketAuthenticate: (
        socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
        next: (err?: ExtendedError) => void
    ) => {
        try {
            const token = socket.handshake.auth.token
            const decoded = jwtHandle.verifyToken(token) as PayloadJWT
            socket.userId = decoded.id
            next()
        } catch (error) {
            next(new Error("Unauthorized"))
        }
        
    }
}