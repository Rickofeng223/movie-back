import {isAdmin} from "../util.js";
import {ratingsModel, reviewsModel, usersModel} from "../../database/schema-files.js";


export function getUserById(req) {
    return usersModel.findById(req.session.user);
}

export function updateByID(_id, toUpdate, model) {
    return model.updateOne({_id}, {$set: {...toUpdate}});
}

export async function putRating(req, res) {


    try {


        const _id = req.params.id;
        const user = await getUserById(req)

        if (user.role || req.body.role === "ADMIN") {
            res.status(403).send("Cannot make yourself an administrator")
        } else if (req.session.user === _id || await isAdmin(_id)) {
            const {_id: rid, ...toUpdate} = req.body
            const user = await updateByID(_id, toUpdate, ratingsModel)
            res.json(user)
        } else {
            res.sendStatus(403)
        }
    } catch (e) {

        res.status(500).send(e.message)
    }


}

export async function putUser(req, res) {
    try {
        if (req.body.role && req.body.role === "ADMIN") {
            res.status(403).send("Cannot make yourself an administrator")
        }


        const user = await updateByID(_id, req.body, usersModel)
        res.json(user)

    } catch (e) {

        res.status(500).send(e.message)
    }


}


export async function putReview(req, res) {
    try {
        let user = req.query.params.user, reviewId = req.query.params.id, postBody = res.body
        const test = await getUserById(user)
        if (user === test._id) {
            updateByID(reviewId, postBody, reviewsModel)
            res.sendStatus(200)
        }
    } catch (e) {

        res.status(500).send(e.message)
    }

}

export async function putCritic(req, res) {
    console.log(`Update Critic`, req.query.params.user, req.params.id, res.body)
    res.send(500)

}