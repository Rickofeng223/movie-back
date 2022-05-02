//            /api/users/
//            /api/users/:id

import {criticsModel, ratingsModel, reviewsModel, usersModel} from "../../database/schema-files.js";

export async function getUser(req, res) {

    const _id = req.params.id
    let response
    if (req.params.id) {
        response = await usersModel.findById(_id)
        console.log('findby id')
    } else {
        console.log('findUsers')
        response = await usersModel.find()
    }
    res.json(response)

}

const sortRecent = (a, b) => b.recent - a.recent;
const sortLikes = (a, b) => b.likes - a.likes;
const sortDislikes = (a, b) => b.dislikes - a.dislikes;
const sortingMethods = {
    likes: sortLikes,
    dislikes: sortDislikes,
    recent: sortRecent
}
//         /api/reviews/
//         /api/reviews/:id
export async function getReview(req, res) {
        let response
        if (req.params.id) {
            response = await reviewsModel.findById(req.params.id)
        } else {
            response = await reviewsModel.find()
            req.query.sort = req.query.sort || 'recent'
            console.log('sortign by: ', req.query.sort)
            response = response.sort(sortingMethods[req.query.sort])

        }
        res.json(response)


}

//         /api/ratings/
//         /api/ratings/:id
export async function getRating(req, res) {

         let response
        if (req.params.id) {
            response = await ratingsModel.findById(req.params.id)
        } else {
            response = await ratingsModel.find()
        }
        res.json(response)

}


export async function getCritic(req, res) {
    try {

            let response
            if (req.params.id) {
                response = await criticsModel.findById(req.params.id)
            } else {
                response = await criticsModel.find()
            }
            res.json(response)

    } catch (e) {

        res.status(500).send(e.message)
    }

}

