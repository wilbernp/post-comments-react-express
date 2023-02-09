import  jwt  from "jsonwebtoken"
import { PayloadJWT } from "../types/auth"

export default {
    generateToken: (payload:PayloadJWT) => {
        return jwt.sign(payload,`${process.env.SECRET_JWT}`)
    },
    verifyToken: (token:string) => {
        return jwt.verify(token, `${process.env.SECRET_JWT}`)
    }
}