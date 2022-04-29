import {ratingsModel, reviewsModel} from "../../database/schema-files.js";
import {isAdmin} from "../util.js";

export async function deleteReview(req, res) {
    try {
        const id = req.params.id;
        if ((req.query.params.user)) {
            const review = await reviewsModel.findById(id)
            if (review.user === req.query.params.user || await isAdmin(req.query.params.user)) {
                await reviewsModel.deleteOne({_id: id})
                await ratingsModel.deleteMany({review: id})
                res.sendStatus(200)
                return
            }
        }

        res.status(403).send("Cannot delete another's review!")
    } catch (e) {

        res.status(500).send(e.message)
    }


}


export async function deleteRating(req, res) {
    try {
        const id = req.params.id;
        const rating = await ratingsModel.findById(id)
        if (rating.user === req.query.params.user || await isAdmin(req.query.params.user)) {
            await reviewsModel.deleteOne({_id: id})
            res.sendStatus(200)
        } else {
            res.sendStatus(403)
        }
    } catch (e) {

        res.status(500).send(e.message)
    }

}
