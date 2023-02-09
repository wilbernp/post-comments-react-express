import { Router } from "express";
import {readdirSync} from "fs"
import path from "path"

const router = Router()
const PATH = __dirname

const cleanFileName = (fileName:string) => {
    const fileNameArray = fileName.split(".")
    // se obtiene el nombre si extension
    const cleanName = fileNameArray[0]
    
    // si el archivo tiene mas de una extension ej: file.ext.ts 
    // se elimina la ultima extension y quedaria file.ext
    if (fileNameArray.length>2) {
        fileNameArray.pop()
        return {
            cleanName,
            forImport:fileNameArray.join(".")
        }
    }
    return {cleanName, forImport:cleanName}
}

// se leen todos los archivos del directorio actual cada uno de los cuales debe
// debe hacer un export = {router} siendo router la instancia de Router
readdirSync(path.join(PATH))
.forEach(file => {
    const {cleanName, forImport} = cleanFileName(file)
    if (cleanName !== "index") {
        console.log("cleanName ", cleanName)
        // se importa el archivo de la posicion actual y se resuelve la promesa 
        // que contiene el router exportado en el archivo
        import(`./${forImport}`)
        .then(module => {
            router.use(`/${cleanName}`, module.router)
        })
    }

})

export {router as apiRouter}