import {createRequire} from 'module'
import * as models from '../../db.js'
import {writeFileSync} from 'fs'
import {createRating, createReview, UserCreator} from './mock.js'
import './drop.js'
import connect from '../connection.js'

const conn = await connect()
const rand = (max) => Math.floor(Math.random() * max);
const json =(x)=>JSON.stringify(x,null,4)

const require = createRequire(import.meta.url)

const movies_raw = require('./movies_raw.json')



const movies = await Promise.all(movies_raw.map(m=>models.movieModel.create(m)))


const {createNormal,createAdmin,createCritUser     }=UserCreator()
const users = {
	normal:[],
	critic:[],
	admin:[],
}
let numUsers=100,numCritics=8,numReviews = 100,numRatings = 500
const auths = []
const crits = []


const [admin,adminAuth] = await createAdmin()
db.authModel.updateOne({_id:adminAuth._id}, {username:'root',password:'toor'})
models.usersModel.updateOne({_id:admin._id},{username:'root'})
auths.push(adminAuth)
users.admin.push(admin)


for (let i = 0; i < numUsers ; i++){
	const [user,userAuth] =await createNormal()
	users.normal.push(user)
	auths.push(userAuth)
	if (i < numCritics){
		const [criticUser,auth,crit] =await createCritUser()

	users.critic.push(criticUser)
		auths.push(auth)
		crits.push(crit)
	}
}
let {normal,critic,admin:admins}=users
const allusers=[...normal,...critic,...admins]
const pick_random =(arr)=> ()=> arr[rand(arr.length-1)]

const uids=allusers.map(e=>e._id)
	,mids=movies.map(e=>e._id)
	,cids=critic.map(e=>e._id)
const randomUser= pick_random(uids)
const randomMovie= pick_random(mids)
const randomCritic= pick_random(cids)
console.log(users.normal.length,users.admin.length,users.critic.length)
console.log(auths.length)
console.log(crits.length)

let makeReview=()=>models.reviewsModel.create (createReview({user:randomUser(),critic :randomCritic(),movie:randomMovie() }))
let reviews = []
for (let i = 0; i < numReviews;i++){
	let review = await makeReview()
	reviews.push(review)
}
let rids= reviews.map(e=>e._id)
const randomReview = pick_random(rids)
const makeRating = ()=>models.ratingsModel.create(createRating({user:randomUser(),review:randomReview()}))

let ratings = []
for (let i = 0; i < numRatings;i++){
	let rating = await makeRating()
	ratings.push(rating)
}
writeFileSync('./db/movies.json',json(movies))
writeFileSync('./db/users.json',json(users))
writeFileSync('./db/auths.json',json(auths))
writeFileSync('./db/crits.json',json(crits))
writeFileSync('./db/reviews.json',json(reviews))
writeFileSync('./db/ratings.json',json(ratings))
await conn.disconnect()











process.exit()



/*
let users = []
// const users = await createUsersInDB()
let auths =[]*//*
for (let i = 0; i < 25; i++) {
	const user =await models.usersModel.create(createUser("NORMAL"))
	const auth = await .create({user:user._id,
		username:user.username,
		password:faker.internet.password()})
	auths.push(auth)
	users.push(user)
	if (i < 7){
		const critic=await models.usersModel.create(createUser("CRITIC"))

		users.push(critic)
	}
}
let user = createUser("ADMIN"),auth={user:user.username,password:'toor'}
user.username='root'
user = await models.usersModel.create(user)
console.log(user,users.length)
auth = await .create({
	user:user._id,
username:user.username,
	password:'toor'
})
users.push(await models.usersModel.create())
auths.push(auth)
 writeFileSync('./users.json',		JSON.stringify(users			,null,4))
 writeFileSync('./auths.json',		JSON.stringify(auths			,null,4))

console.log(users.filter(e=>e.role!== "NORMAL") )
let crit_ids = users.filter(e=>e.role==="CRITIC").map(e=>e._id)
const critic_acct = await Promise.all( crit_ids.map(user=>mock.createCrit(user))
	.map(async c=>await models.criticsModel.create(c)))

writeFileSync('./critics.json',JSON.stringify(critic_acct,null,4))

//todo////////////////////////////////////???TODO//////////////////////////////////////////////

const mids = movies.map(e => e._id)
const uids = users.map(e => e._id)
const randomMovies = createRandomGetter(mids)
const pick_random =(arr)=> arr[rand(arr.length-1)]
const randomReviewer = ()=>pick_random(crit_ids)
let asyncReviews =uids
	.map(uid=>{
	return ({user:uid,movies:randomMovies(rand(40), mids.length - 1) })
})
	.map(u=> mock.createReview({...u,critic:randomReviewer()}))
	.map(async review=> await reviewModel.create(review))
const reviews= await Promise.all(asyncReviews)
writeFileSync('./reviews.json',JSON.stringify(reviews,null,4))

const rids= reviews.map(e=>e._id)
const randomMovieReview=()=>pick_random(rids)
let numRatings=3000
let ratings = []
for (let i = 0; i < numRatings ; i++){
	const rating = await models.ratingsModel.create( mock.createRating({
		user:pick_random(user),
		review:randomMovieReview()	})
	)
	ratings.push(rating)
}
writeFileSync('./ratings.json',JSON.stringify(ratings,null,4))

//
//
// const ratings = uids .map(id => ({id,movies:randomMovies(rand(40), mids.length - 1) }))
//
// let revs = []
// for (let i in ratings){
// 	const rating = ratings[i]
// 	const user = rating.id
// 	const ratedMovies = rating.movies
// 	for(let i in ratedMovies){
// 		revs.push(
// 			await db.reviewModel
// 			.create(createReview(user, ratedMovies[i],pa)))
// 	}
// }
//
//
// writeFileSync('./reviews.json',JSON.stringify(revs,null,4))

await conn.disconnect()



*/







 
