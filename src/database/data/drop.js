import {movieModel,criticsModel,usersModel,reviewsModel,ratingsModel} from '../schema-files.js'

import connect from '../connection.js'
import authModel from "../authentication/auth-model.js";
const conn = await connect()
let models = [movieModel,criticsModel,usersModel,reviewsModel,ratingsModel]
await Promise.all(models.map(async e=> e.deleteMany({})))
await(authModel.deleteMany({}))
await conn.disconnect()
