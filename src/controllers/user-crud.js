import {authModel, usersModel} from "../database/schema-files.js";

export async function signup(req, res) {
    const newUser = req.body;
    const {username, password, userData} = newUser
    let search = await authModel.find({username,password})
    console.log(search)
    if (search.length) {
        res.status(403).send(`User ${username} already exists!`)
        return
    }


    try{

        const role = (userData.role || "NORMAL").toUpperCase()

        const user = await usersModel.create({
            ...userData, username,role
        })
        await authModel.create({
            username,
            password,
            user:user._id
        })
        switch (role) {
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

export async function login(req, res) {
    const {username, password} = req.body
    let [test]=await authModel.find({username, password})

    if (test) {
        let user = await usersModel.findById(test.user)
        req.session.user =user._id
        res.json(user)

    } else {
        res.sendStatus(400)
    }

}


export function logout(req, res) {
    req.session.destroy();
}

