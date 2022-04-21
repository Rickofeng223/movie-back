import {createRequire} from 'module'
import {movieModel,userModel,reviewModel} from '../../db.js'
import * as db from '../../db.js'
import{writeFileSync}from 'fs'
import {createReviews,createReview,rand}from './lib.js'
import './drop.js'
import {createUsersInDB,createUser} from './lib.js'

import connect from '../connection.js'
const conn = await connect()



const require = createRequire(import.meta.url)

const movies_raw = require('./movies_raw.json')



await userModel.deleteMany({})
await reviewModel.deleteMany({})
await movieModel.deleteMany({})
const movies = await Promise.all(movies_raw.map(m=>movieModel.create(m)))
writeFileSync('./movies.json',JSON.stringify(movies,null,4))




const users = await createUsersInDB()
 writeFileSync('./users.json',		JSON.stringify(users			,null,4))




const mids = movies.map(e => e._id)
const uids = users.map(e => e._id)
const randomSet = createReviews(mids)





const ratings = uids
	.map(id => ({id,movies:randomSet(rand(40), mids.length - 1) }))

let revs = []
for (let i in ratings){
	const rating = ratings[i]
	const user = rating.id
	const ratedMovies = rating.movies
	for(let i in ratedMovies){
		revs.push(
			await db.reviewModel
			.create(createReview(user, ratedMovies[i])))
	}
}


writeFileSync('./reviews.json',JSON.stringify(revs,null,4))

await conn.disconnect()











 
