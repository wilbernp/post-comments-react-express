import express  from "express";
import http from "http"
import {Server} from "socket.io"
import cors from "cors"
import morgan from "morgan"
import { apiRouter } from "./routes/api";
import { authRouter } from "./routes/auth";

const app = express()

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))



// este middleware sirve para poder usar io a traves de las ruta http del servidor
app.use((req, res, next)=>{
    req.io = io
    next()
})

app.use("/api", apiRouter)
app.use("/auth", authRouter)

io.on("connection", (socket) => {
    console.log("socket ", socket.id)
})

export default httpServer