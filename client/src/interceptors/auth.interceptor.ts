import localStorageHandle from "@/utils/localStorage.handle";
import { AxiosInstance } from "axios";

export default { 
    setToken: (axiosInstance:AxiosInstance) =>{
    axiosInstance.interceptors.request.use(
        (config) => {
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${localStorageHandle.getItem("token")}`
            }
            return config
        },
        (error) => {
            throw new Error(error)
        }
    )
}
}
