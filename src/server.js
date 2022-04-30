import express from 'express'
import cors from 'cors'
import session from "express-session";
import controller from './controllers/controller-routes.js'
import sessionController from "./controllers/old/sessions/index.js";

export const url = `http://localhost:${process.env.PORT || 4000}`
import {connection, criticsModel, reviewsModel, usersModel} from '../src/db.js'


const express_app = async () => {
    let db
    try {
        db = await connection()
    } catch (e) {
        throw new Error(`DB CONNECTION ERROR: ${e}`)

    }
    if (!db) {
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

    app.use(session(sess));
    app.use(cors())

    app.use(express.json())

    controller(app)
    const PORT = process.env.PORT || 4000
    const runningApp = app.listen(PORT, () => console.log(`listening on port ${PORT}`))
    return {
        db, app: runningApp,
        shutDown: async () => {
            await db.disconnect()
            await runningApp.close()
        }
    };
}


export default express_app