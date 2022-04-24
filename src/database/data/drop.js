import {movieModel,criticsModel,usersModel,reviewsModel,ratingsModel,authModel} from '../../db.js'

import connect from '../connection.js'
const conn = await connect()
let models = [movieModel,criticsModel,usersModel,reviewsModel,ratingsModel]
await Promise.all(models.map(async e=> e.deleteMany({})))
await(authModel.deleteMany({}))
await conn.disconnect()
