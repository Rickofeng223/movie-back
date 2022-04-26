import {criticsModel, ratingsModel, reviewsModel, usersModel} from "../../database/schema-files.js";

export async function postRating(req, res) {
    try {
        const rating = await ratingsModel.create({...req.body, user: req.session.user})
        res.json(rating)
    } catch (e) {

        res.status(500).send(e.message)
    }

}


export async function postReview(req, res) {
    try {
        if (!req.session.user || await usersModel.findById(req.session.user)) {
            res.status(403).send("must be logged in to post a review")
            return
        }

        const user = await usersModel.findById(req.session.user)

        if (user.role === 'CRITIC') {
            const critic = await criticsModel.find({user: user._id})
            const review = await reviewsModel.create({...req.body, critic})
            res.json(review)
            return
        }
        res.status(403).send("Must be a critic to write a review")
    } catch (e) {

        res.status(500).send(e.message)
    }

}
