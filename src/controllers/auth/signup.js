import {authModel, usersModel} from "../../database/schema-files.js";

export default async function signup(req, res) {
    const newUser = req.body;
    const {   password , userData:{username,...rest}} = newUser
    let search = await authModel.find({username,password})
    console.log(search)
    if (search.length) {
        res.status(403).send(`User ${username} already exists!`)
        return
    }


    try{


        const user = await usersModel.create({
            ...rest, username
        })
        await authModel.create({
            username,
            password,
            user:user._id
        })
        switch (rest.role) {
            case"ADMIN":
            case"NORMAL":
                req.session.user = user._id
                res.json(user)
                return
            case"CRITIC":
                return
        }
    }catch (e) {
        res.send(e.toString())
        return
    }
    res.sendStatus(400 )

}
