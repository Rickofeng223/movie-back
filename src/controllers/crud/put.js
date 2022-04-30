import {isAdmin} from "../util.js";
import {ratingsModel, reviewsModel, usersModel} from "../../database/schema-files.js";


export function getUserById(id) {
    return usersModel.findById(id);
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



        const user = await updateByID(req.query.user, req.body, usersModel)
        res.json(user)

    } catch (e) {

         res.status(500).send(e.message)
    }


}


export async function putReview(req, res) {
    try {
        let user = req.query.user, reviewId = req.body._id, postBody = res.body

        if (user ) {
            updateByID(reviewId, postBody, reviewsModel)
            res.sendStatus(200)
            return
        }
    } catch (e) {
        console.log(e,2)

        res.status(500).send(e.message)
    }

}

export async function putCritic(req, res) {
    console.log(`Update Critic`, req.query.user, req.id, res.body)
    res.send(500)

}