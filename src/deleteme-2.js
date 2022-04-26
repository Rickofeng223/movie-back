import {connection,reviewsModel,movieModel,criticsModel, usersModel, ratingsModel} from './db.js'
const c = await connection()



const userid = '62683735b3fd791031d47300'
const criticid = '62683735b3fd791031d4731c'
const movieid = '62683734b3fd791031d4635d'
const ratingid = '62683735b3fd791031d47329'

/* const critic_id = await criticsModel.findOne({user: userid},{"_id":1})
console.log(critic_id._id)
const reviews = await reviewsModel.find({critic: critic_id})
// console.log(reviews)
let moviesIds = reviews.map(e=>e.movie)
const movies = await movieModel.find({
    _id: {$in: moviesIds}
})
console.log(movies) */


/* const movie_id = movieid
const reviews = await reviewsModel.find({movie: movie_id})
// console.log(reviews)
let criticIds = reviews.map(e=>e.critic)
// console.log(criticIds)
const critics = await criticsModel.find({
    _id: {$in: criticIds}
})
let userIds = critics.map(e=>e.user)
// console.log(userIds)

const users = await usersModel.find({
    _id: {$in: userIds}
})

console.log(users)
// console.log(critics) */


/*const user_id = userid
const ratings = await ratingsModel.find({user: user_id})
console.log(ratings)
*/


/* const user_id = userid
const critic_id = await criticsModel.findOne({user: user_id},{"_id":1})
const reviews = await reviewsModel.find({critic: critic_id})
console.log(reviews) */


/* const rating_id = ratingid
const ratings = await ratingsModel.find({_id: rating_id})
let reviewIds = ratings.map(e=>e.review)
const reviews = await reviewsModel.find({
    _id: {$in: reviewIds}
})
let moviesIds = reviews.map(e=>e.movie)
const movies = await movieModel.find({
    _id: {$in: moviesIds}
})
console.log(movies) */



/*
const rating_id = ratingid
const ratings = await ratingsModel.find({_id: rating_id})
const userIds = ratings.map(e=>e.user)
const users = await usersModel.find({
    _id: {$in: userIds}
})
*/


/*
const movie_id = movieid

const reviews = await reviewsModel.find({movie: movie_id})

console.log(reviews)
*/

await c.disconnect()