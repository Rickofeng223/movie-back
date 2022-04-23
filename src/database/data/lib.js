import dummy from "mongoose-dummy";
import * as models from './../schema-files.js'
import {createUser} from "./mock.js";

export const rand = (max) => Math.floor(Math.random() * max);



export const createReview = (user, movie) => {
    const review = dummy(models.reviewsModel)
    delete review._id
    delete review.__v
    review.user = user
    review.movie = movie
    return review
}


export const createRandomGetter = (movies) => function (numMovies= rand(40)) {
    const set = new Set()
    while (set.size < numMovies) {
        set.add(rand(movies.length - 1))
    }
    return ([...set]).map(e => movies[e])
}


export const createUsersInDB = async (users = []) => {
    for (let i = 0; i < 100; i++) {
        users.push(await models.usersModel.create(createUser("NORMAL")))
    }
    return users
}