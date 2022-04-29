import {criticsModel, ratingsModel, reviewsModel, usersModel} from "../../database/schema-files.js";

export async function postRating(req, res) {
    try {
        const rating = await ratingsModel.create({...req.body.rating, user: req.body.user})
        res.json(rating)
    } catch (e) {

        res.status(500).send(e.message)
    }

}


export async function postReview(req, res) {
    try {
        let __review =req.body.review
        let __user  =req.body.user
        if (!__user || await usersModel.findById(__user)) {
            res.status(403).send("must be logged in to post a review")
            return
        }

        const user = await usersModel.findById(__user)

        if (user.role === 'CRITIC') {
            const critic = await criticsModel.find({user: user._id})
            const review = await reviewsModel.create({...__review, critic})
            res.json(review)
            return
        }
        res.status(403).send("Must be a critic to write a review")
    } catch (e) {

        res.status(500).send(e.message)
    }

}
