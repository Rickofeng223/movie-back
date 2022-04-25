import {reviewsModel, usersModel, movieModel, ratingsModel, criticsModel, authModel} from '../db.js'
import axios from "axios";

const createMovie = (raw) => {
    return movieModel.create({
        tmdb_id: raw.id,
        title: raw.title,
        homepage: raw.homepage,
        release_date: raw.release_date,
        overview: raw.overview,
        poster_path: raw.poster_path,
        genre_ids: raw.genre_ids,
        vote_average: raw.vote_average
    })
}

//        /movies/
//        /movies/:id
export const getMovie = async (req, res) => {
    const id = req.params.id
    try {
        let findBy
        if (id) {
            findBy = await movieModel.findById(id)
        } else {
            findBy = await movieModel.find()
        }
        res.json(findBy)
    } catch (e) {
        res.status(500).send("Error:" + e.message)
    }
}

//        /movies/tid/:id

export async function getByTid(req, res) {
    const tid = req.params['tid']
    const result = await movieModel.find({tmdb_id: tid})
    if (result.length) {
        res.json(result[0])
    } else {
        const request = await axios.get(api(`/movie/${tid}`, ''))
        const movie = await createMovie(request.data)
        res.json(movie)
    }

}

//            /api/users/
//            /api/users/:id

export async function getUser(req, res) {
            console.log(req.session.user, await usersModel.findById(req.session.user), req.params)
    if (req.session.user && await usersModel.findById(req.session.user)) {
        let response
        if (req.params.id) {
            console.log('findbyid')
            response = await usersModel.findById(req.params.id)
            console.log(response)
        } else {
            console.log('find')
            response = await usersModel.find()
            console.log(response)
        }

        res.json(response)
    } else {
        res.sendStatus(400)
    }
}

//         /api/reviews/
//         /api/reviews/:id
export async function getReview(req, res) {
    if (req.session.user && await usersModel.findById(req.session.user)) {
        let response
        if (req.params.id) {
            response = await reviewsModel.findById(req.params.id)
        } else {
            response = await reviewsModel.find()
        }
        res.json(response)
    } else {
        res.status(403).send("must be logged in to see reviews")
    }

}

//         /api/ratings/
//         /api/ratings/:id
export async function getRating(req, res) {

    if (req.session.user && await usersModel.findById(req.session.user)) {
        let response
        if (req.params.id) {
            response = await ratingsModel.findById(req.params.id)
        } else {
            response = await ratingsModel.find()
        }
        res.json(response)
    } else {
        res.status(403).send("must be logged in to see ratings")
    }

}


export async function getCritic(req, res) {
    console.log(req.session.user)
    if (req.session.user && await usersModel.findById(req.session.user)) {
        let response
        if (req.params.id) {
            response = await criticsModel.findById(req.params.id)
        } else {
            response = await criticsModel.find()
        }
        res.json(response)
    } else {
        res.status(400).send("must be logged in to view critics")
    }
}


export async function postReview(req, res) {
    console.log(`Posting Review`, req.session.user, res.body)
    if (!req.session.user || await usersModel.findById(req.session.user)) {
        res.status(403).send("Must be loggedin to write a review")
    }

    const user = await usersModel.findById(req.session.user)

    if (user.role === 'CRITIC') {
        const critic = await criticsModel.find({user: user._id})
        const review = await reviewsModel.create({...req.body, critic})
        res.json(review)
        return
    }
    res.status(403).send("Must be a critic to write a review")
}

export async function postRating(req, res) {
    console.log(`Posting Rating`, req.session.user, res.body)

    const rating = await ratingsModel.create({...req.body, user: req.session.user})
    res.json(rating)
}


export async function putReview(req, res) {
    console.log(`Update Review`, req.session.user, req.params.id, res.body)

    //TODO write body for putReview
}

export async function putCritic(req, res) {
    console.log(`Update Critic`, req.session.user, req.params.id, res.body)
}


async function isAdmin(_id) {
    const user = await usersModel.findById(_id);
    return user.role === "ADMIN"
}

export async function deleteReview(req, res) {

    const id = req.params.id;

    if ((req.session.user)) {
        const review = await reviewsModel.findById(id)
        if (review.user === session.user || await isAdmin(session.user)) {
            await reviewsModel.deleteOne({_id: id})
            await ratingsModel.deleteMany({review: id})
            res.sendStatus(200)
            return
        }
    }

    res.status(403).send("Cannot delete another's review!")


}


export async function putRating(req, res) {

    //TODO write body for putRating
}

export async function deleteRating(req, res) {

    const id = req.params.id;
    const rating = await ratingsModel.findById(id)
    if (rating.user === req.session.user || await isAdmin(req.session.user)) {
        await reviewsModel.deleteOne({_id: id})
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    }

}

export async function putUser(req, res) {

    const _id = req.params.id;
    if (req.body.role && req.body.role === "ADMIN") {
        res.status(403).send("Cannot make yourself an administrator")
    }
    if (req.session.user === _id || await isAdmin(_id)) {
        const user = await usersModel.updateOne({_id}, ...body)
        res.json(user)
    } else {
        res.sendStatus(403)
    }


}


//todo DECIDE IF DELETING REVIEWS/RATINGS ON ACCOUNT DELETION
export async function deleteUser(req, res) {
    const session = req.session
    const _id = req.params.id;
    if (session.user === _id || await isAdmin(session.user)) {
        const user = usersModel.findById(_id)
        if (user.role === "CRITIC") {
            await criticsModel.deleteOne({user: _id})
        }
        await usersModel.deleteOne({_id})
        await authModel.deleteOne({user: _id})

        res.sendStatus(200)

    } else {
        res.sendStatus(403)
    }
}
