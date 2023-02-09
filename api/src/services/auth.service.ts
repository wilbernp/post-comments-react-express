import { Login } from "../types/auth"
import { UserCreate } from "../types/user"
import bcryptHandle from "../utils/bcrypt.handle"
import jwtHandle from "../utils/jwt.handle"
import userService from "./users.service"

export default {
    register: async (user:UserCreate) => {
    
        const findUser = await userService.getByEmail(user.email)
        if (findUser) return

        const encryptPassword = await bcryptHandle.encrypt(user.password)
        const newUser = await userService.create({...user,password:encryptPassword})
        const token = jwtHandle.generateToken({id:newUser._id})
        return {token}
        
    },
    login: async (user:Login) => {
        const findUser = await userService.getByEmail(user.email)
        if(!findUser){
            throw new Error("User is not registered")
        }
        const isCorrect = await bcryptHandle.compare(user.password, findUser.password)
        if (!isCorrect) {
            throw new Error("Email or password incorrect")
        }

        const token = jwtHandle.generateToken({id:findUser._id})
        return {token}
    },

}