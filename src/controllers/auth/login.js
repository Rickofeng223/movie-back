import {authModel, usersModel} from "../../database/schema-files.js";

export default async function login(req, res) {
  try  {
        const {username, password} = req.body
         let [test]=await authModel.find({username, password})
 
        if (test) {
            let user = await usersModel.findById(test.user)
            // req.session.user = user._id.toString()
            res.json(user)
            return


        } else {
            res.status(403).send("Bad Login Info")
        }
    }catch (e) {
     res.sendStatus(e.message).send(500)
  }
}

