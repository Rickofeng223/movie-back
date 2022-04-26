import {ratingsModel, connection, movieModel, criticsModel, reviewsModel, usersModel, authModel, } from './db.js'
import mongoose from "mongoose";


const c =await connection()
    /*

    give USER ID OF A CRITIC
    GET CRITIC ID
    GET REVIEWS WTIH CRIT IDd
     */





const critic_id='626808e4152cebe3eba73118\n'
const user_id = "62681871a10c60bcc946ec98"
let _id =   '626824a9aa0b424d7fc39047'

console.log(await usersModel.findById(_id))
// console.log(users  )
//
// const critic_id1 = await criticsModel.findOne({user: user_id},{"_id":1})
//
// console.log(critic_id1)
//
// const reviews = await reviewsModel.find({critic: user_id})
//
// console.log(reviews)
//




// let moviesIds = reviews.map(e=>e.movie)
//
// const movies2 = await movieModel.find({
//     _id: {$in: moviesIds}
// })
//
// // console.log(moviesIds)
//
// console.log(movies2)












await c.disconnect()