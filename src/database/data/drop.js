import {movieModel,userModel,reviewModel} from '../../db.js'

import connect from '../connection.js'
const conn = await connect()
await userModel.deleteMany({})
await reviewModel.deleteMany({})
await movieModel.deleteMany({})

await conn.disconnect()
