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
    let i
    console.log('params',req.params)
    console.log('query',req.query)
    try {
        let __review =req.body
        let __user  =req.query.user
        console.log(i++)

        let user
        try{
            user = await usersModel.findById(__user)
            console.log(i++)

        }catch(e){
           console.log(e)
            res.sendStatus(503)
            return
        }
        if (user.role === 'CRITIC') {
   try{
       const critic = await criticsModel.find({user: __user })
       console.log(critic)
       try{
           const review = await reviewsModel.create({...__review, critic:critic._id})
           res.json(review)

       }catch (e) {
           console.log(e)
           res.send(504)
           return
       }
   }catch (e) {
           console.log(e)
           res.send(505)
           return

   }

         }else{
            res.json({message: "something went wrong", user:__user,__review})
            return

        }
     } catch (e) {
console.log('error:' ,e)
        res.status(500).send(e.message)
    }

}
