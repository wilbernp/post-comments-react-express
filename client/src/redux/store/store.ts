import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../states/user.slice";

export const store = configureStore({
    reducer:{
        user:userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
// tipadp del dispatch del store
export type AppDispatch = typeof store.dispatch