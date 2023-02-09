import { clientAuth } from "@/config/clientAxios"

export default {
    getAllPosts(){
        return clientAuth.get("api/posts")
    }
}