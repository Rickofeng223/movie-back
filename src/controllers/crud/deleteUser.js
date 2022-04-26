
//todo DECIDE IF DELETING REVIEWS/RATINGS ON ACCOUNT DELETION
import {authModel, criticsModel, usersModel} from "../../database/schema-files.js";
import {isAdmin} from "../util.js";

export default async function deleteUser(req, res) {
    try{
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
    }catch (e){

        res.status(500).send(e.message)
    }

}
