import { clientAuth } from "@/config/clientAxios"

export default {
    getProfile:() => {
        return clientAuth.get("api/users/profile")
    }
}