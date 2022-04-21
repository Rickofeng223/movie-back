import {userModel, reviewModel, movieModel} from '../../db.js'
import mongoose from "mongoose";
import {connection} from "../../db.js";
const conn = await connection()

import {createRequire} from 'module'

const require = createRequire(import.meta.url)

const movies = require('./movies.json')
const users = require('./users.json')
const reviews = require('./reviews.json')
await Promise.all(movies.map(async (m) => await movieModel.create(m)))
await Promise.all(users.map(async (u) => await userModel.create(u)))
await Promise.all(reviews.map(async (r) => await reviewModel.create(r)))

await conn.disconnect()
