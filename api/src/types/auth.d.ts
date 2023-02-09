import { Types } from "mongoose";

export interface Login {
    email:string;
    password:string;
}

export interface PayloadJWT {
    id:Types.ObjectId
}