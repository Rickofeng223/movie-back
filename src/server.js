import express from 'express'
import cors from 'cors'
import session from "express-session";
import controller from './controllers/controller-routes.js'
import sessionController from "./controllers/old/sessions/index.js";

export const url = `http://localhost:${process.env.PORT || 4000}`
import {connection} from '../src/db.js'


const express_app = async () => {
    let conn
    try {
        conn = await connection()
    } catch (e) {
        throw new Error(`DB CONNECTION ERROR: ${e}`)

    }
    if (!conn) {
        throw new Error(`DB CONNECTION ERROR!`)
    }
    console.log('connected to db!')

    const app = express();


    const sess = {
        resave: false,
        saveUninitialized: true,
        secret: process.env.SECRET || "secret",
        /*   cookie: {secure: false}*/
    };
    if (process.env.ENV === 'production') {
        app.set('trust proxy', 1)
        sess.cookie.secure = true;
    }
    app.use(session(sess));
    app.use(cors({
            credentials: true,
            // origin: 'http://localhost:4000'
        }
    ))

    app.use(express.json())

    controller(app)


    sessionController(app)

    const PORT = process.env.PORT || 4000
    return {db: conn, app: app.listen(PORT, () => console.log(`listening on port ${PORT}`))};
}


export default express_app