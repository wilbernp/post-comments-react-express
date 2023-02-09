import { Types } from "mongoose";
import { IPost } from "./post";

export interface UserCreate {
    username:string;
    email:string;
    password:string;
    posts:Types.ObjectId[];
}

export type UserUpdate = Partial<UserCreate>