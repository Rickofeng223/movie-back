import reviewsModel from "./reviews/reviews-model.js";
import * as db from "../db.js";
import {userModel} from "../db.js";

export const reviewJoinMovies = (movie) => reviewsModel.find({movie})
export const userJoinReviews = (user) => reviewsModel.find({user})


export const moviesFromUserJoinReviews = async (uid) => {

    const res = await db.reviewModel.find({user: uid})
    const mapped = res.map(e => e['movie'])
    return Promise.all(mapped.map(async (e) => await (db.movieModel.findById(e))))

}
export const usersThatRatedMovie = async (mid) => {
    let reviews = await db.reviewModel.find({movie: mid}).exec()
    reviews = reviews.map(r => r.user)
    reviews = await Promise.all(async (u) => await userModel.findById(u))
    return reviews

}

