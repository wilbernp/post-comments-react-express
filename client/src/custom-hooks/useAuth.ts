import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
type PathOptions = {
    auth:string;
    succesRedirect:string;
    excludes?:string[];
}
export default function useAuth(pathOptions:PathOptions,deps:React.DependencyList){
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()
    const {pathname} = useLocation()

    useEffect(() => {
      const token = localStorage.getItem("token")
      console.log("useefect ", token)
      if (!token && !pathOptions?.excludes?.includes(pathname)) {
        setIsAuth(false)
        return navigate(pathOptions.auth,{replace:true})
      }
      setIsAuth(true)
      navigate(pathname === pathOptions.auth?pathOptions.succesRedirect:pathname, {replace:true})
    }, [...deps])

    return isAuth
}