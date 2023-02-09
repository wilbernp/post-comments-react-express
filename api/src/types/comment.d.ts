import { Types } from "mongoose";

export interface IComment {
    content:string;
    author:Types.ObjectId;
    postId:Types.ObjectId
}

export interface ICommentBody {
    content:string
}

export interface ICommentParams {
    postId:Types.ObjectId
}