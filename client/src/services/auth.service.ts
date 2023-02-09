import { clientPublic } from "@/config/clientAxios"
type LoginData = {
    email:string;
    password:string;
}
export default {
    login:(data:LoginData) => {
        return clientPublic.post("auth/login",data)
    }
}