import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { PayloadJWT } from "../../src/types/auth";


declare global {
    namespace Express {
        interface Request {
            user:PayloadJWT;
            io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
        }
    }
}