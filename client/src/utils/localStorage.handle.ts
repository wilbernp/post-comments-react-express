export default {
    getItem<T>(key:string):null | T{
        const data = localStorage.getItem(key)
        if (!data) return null
        return JSON.parse(data)
    },
    setItem<T>(key:string, value:T){
        localStorage.setItem(key,JSON.stringify(value))
    },
    deleteItem(key:string){
        localStorage.removeItem(key)
    }
}