import "dotenv/config";
import httpServer from "./src/app";
import { mongooseConnection } from "./src/config/mongo-db.config";

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, async ()=>{
    try {
        await mongooseConnection()
        console.log("listening at port ", PORT)
    } catch (error) {
        console.log(error)
    }
   
})