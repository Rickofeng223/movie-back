import {authModel, criticsModel, usersModel} from "../../database/schema-files.js";

export default async function signup(req, res) {
    const newUser = req.body;
    if (!newUser.password || !newUser.userData.username){
        res.status(403).send("missing data")
        return
    }


    const {   password , userData:{username,...rest}} = newUser
    let search = await authModel.find({username,password})
     if (search.length) {

        console.log("Found User Auth")
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
        req.session.user = user._id
        let crit
        if (newUser.critic){
            crit = newUser.critic
        }else{
            crit={experience:0,organisation:"NONE",}
        }


        if (rest.role==="CRITIC"){
            await criticsModel.create({user:user._id,...crit})
        }

        
        console.log("USER: ",user)

        res.json(user)

    }catch (e) {

        res.send(e.toString())
        return
    }


    res.sendStatus(400 )

}
