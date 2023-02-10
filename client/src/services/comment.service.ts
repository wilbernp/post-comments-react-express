import { clientAuth } from "@/config/clientAxios"

export default {
    create(postId:string, comment:string){
        return clientAuth.post(`api/posts/${postId}/comments`,{content:comment})
    }
}