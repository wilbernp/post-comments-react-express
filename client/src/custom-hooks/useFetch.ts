import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";


export default function useFetch<T>(cbSucces?:(data:T)=>void):[(axiosPromise: Promise<AxiosResponse<T>>)=>Promise<void>,T|null,boolean,string | null] {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchData(axiosPromise: Promise<AxiosResponse<T>>) {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosPromise
            setData(data)
        } catch (error:any) {
            console.log("useFetch Error ", error)
            setError(error?.message || "An unexpected error has occurred")
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (data && typeof cbSucces === "function") {
            cbSucces(data)
        }
    }, [data])
    

    return [fetchData, data, loading, error]

}