import { Types } from "mongoose"
import { UserModel } from "../schemas/user.schema"
import { UserCreate, UserUpdate } from "../types/user"

export default {
    create: async (user:UserCreate) => {
        const userCreated = await new UserModel(user).save()
        return userCreated
    },
    getById: async (id:Types.ObjectId) => {
        return await UserModel.findById(id)
    },
    getByEmail: async (email:string) => {
        const findUser = await UserModel.findOne({email})
        // if(!findUser) throw new Error("User is not exist")
        return findUser
    }
}