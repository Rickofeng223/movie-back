
import dummy from "mongoose-dummy";
import * as db from '../../db.js'




export const rand =(max)=>Math.floor(Math.random() * max);
 

export const createUser =()=>{
    const user= dummy(db.userModel)
    delete user._id
    return user
}


 export const createReview= (user, movie) => {
    const review = dummy(db.reviewModel)
    delete review._id
    delete review.__v
    review.user = user
    review.movie = movie
    return review
}


export const createReviews= (movies)=> function ( numMovies, range) {
    const set = new Set()
    while (set.size < numMovies) {
        set.add(rand(movies.length-1))
    }
    return( [...set]).map(e=>movies[e])
}



export const createUsersInDB = async(users = [])=>{
	for(let i = 0;i < 100;i++){
		users.push(await db.userModel.create(createUser()))
	}
	return users
}