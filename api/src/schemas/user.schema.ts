import { model, Schema } from "mongoose";
import { UserCreate } from "../types/user";

const UserSchema = new Schema<UserCreate>({
    email:String,
    password:String,
    username:String,
    posts:[{type:Schema.Types.ObjectId, ref:"Post"}]
},{timestamps:true})

export const UserModel = model<UserCreate>("User",UserSchema)