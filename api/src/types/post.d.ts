import { Types } from "mongoose";

export interface IPost {
    content:string;
    author:Types.ObjectId;
    comments?:Types.ObjectId[]
}