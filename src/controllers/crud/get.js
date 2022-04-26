
//            /api/users/
//            /api/users/:id

import {isLoggedIn} from "../util.js";
import {criticsModel, ratingsModel, reviewsModel, usersModel} from "../../database/schema-files.js";

export async function getUser(req, res) {
    if (await isLoggedIn(req)) {
        let response
        if (req.params.id) {
            response = await usersModel.findById(req.params.id)
        } else {
            response = await usersModel.find()
        }
        res.json(response)
    } else {
        res.status(403).send("must be logged in to see ratings")
    }
}

//         /api/reviews/
//         /api/reviews/:id
export async function getReview(req, res) {
    if (await isLoggedIn(req)) {
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

    if (await isLoggedIn(req)) {
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
    try{
        if (await isLoggedIn(req)) {
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
    }catch (e){

        res.status(500).send(e.message)
    }

}

