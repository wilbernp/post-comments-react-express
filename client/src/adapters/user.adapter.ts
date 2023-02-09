import { IUser } from "@/types/user";

export default function userAdapter(data:IUser):IUser{
    return{
        email:data.email,
        username:data.username
    }
}