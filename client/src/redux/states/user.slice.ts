import { IUser } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState:IUser = {
    email:"",
    username:"",
    isAuth:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state, action)=>{
            return {
                ...state,
                ...action.payload
            }
        },
        setIsAuth:(state,action)=>{
            return{
                ...state,
                isAuth:action.payload
            }
        }
    }
})


export const {setUser,setIsAuth} = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer