import connection from "../connection.js";
import './drop.js'

const conn = await connection()
import * as models from '../../db.js'
import {createRequire} from 'module'

const require = createRequire(import.meta.url)


const movies = require('./db/movies.json')
const {admin, normal, critic} = require('./db/users.json')
const users = [...critic, ...normal, ...admin]
const ratings = require('./db/ratings.json')
const reviews = require('./db/reviews.json')
const crits = require('./db/crits.json')
const auths = require('./db/auths.json')
await Promise.all(movies.map(async (m) => await models.movieModel.create(m)))
await Promise.all(users.map(async (u) => await models.usersModel.create(u)))
await Promise.all(ratings.map(async (r) => await models.ratingsModel.create(r)))
await Promise.all(reviews.map(async (r) => await models.reviewsModel.create(r)))
await Promise.all(auths.map(async (r) => await models.authModel.create(r)))
await Promise.all(crits.map(async (r) => await models.criticsModel.create(r)))

await conn.disconnect()
