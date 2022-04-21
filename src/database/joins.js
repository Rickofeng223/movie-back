import reviewsModel from "./reviews/reviews-model.js";
import * as db from "../db.js";
import {userModel} from "../db.js";

export const reviewJoinMovies = (movie) => reviewsModel.find({movie})
export const userJoinReviews = (user) => reviewsModel.find({user})


export const moviesFromUserJoinReviews = async (uid) => {

console.log('a')
console.log(uid)
    const res = await db.reviewModel.find({user: uid})
console.log('b')
    const mapped = res .map(e=> e['movie'])
console.log('b')
        return Promise.all(mapped.map(async (e)=> await(db.movieModel.findById(e))))
    // return await Promise.all(
    //     res.map(async (m) =>
    //     await db.movieModel.findById(m['movie'].toString())))
}
export const usersThatRatedMovie= async (mid)=>{
    let reviews = await db.reviewModel.find({movie:mid}).exec()
    reviews = reviews.map(r=>r.user)
    reviews = await Promise.all(async (u)=> await userModel.findById(u))
    return reviews

}

