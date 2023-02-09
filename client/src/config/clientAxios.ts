import authInterceptor from "@/interceptors/auth.interceptor";
import localStorageHandle from "@/utils/localStorage.handle";
import axios from "axios";

export const clientAuth =  axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}`
})

authInterceptor.setToken(clientAuth)

export const clientPublic = axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}`
})

