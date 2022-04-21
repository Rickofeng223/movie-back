import express from 'express'
import cors from 'cors'
import controllers from './controllers/index.js'
import session from "express-session";
import sessionController  from "./controllers/sessions/index.js";
export const url =  `http://localhost:${process.env.PORT || 4000}`
import {connection} from '../src/db.js'
const express_app = async ()=> {
    const conn = await connection()


    const app = express();


    app.use(cors({
            credentials: true,
            // origin: 'http://localhost:4000'
        }
    ))
    app.use(express.json())

    controllers(app)




    const sess = {
        resave: false,
        saveUninitialized: true,
        secret: process.env.SECRET||"secret",
        cookie: {secure: false}
    };
    if (process.env.ENV === 'production') {
        app.set('trust proxy', 1)
        sess.cookie.secure = true;
    }
    app.use(session(sess));
    sessionController(app)

    const PORT = process.env.PORT || 4000
    return {db:conn,app:app.listen(PORT, () => console.log(`listening on port ${PORT}`))};
}



export default express_app