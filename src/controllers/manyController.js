import {movieModel, ratingsModel, reviewsModel, usersModel} from "../database/schema-files.js";

export function manyQueries(app) {

    //get movies reviewed by a particular critic
    app.get('/api/critics/:id/movies', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }
        try{
            const user_id = req.params.id // users primary key
            const critic_id = await criticsModel.findOne({user: user_id},{"_id":1})
            const reviews = await reviewsModel.find({critic: critic_id})
            let moviesIds = reviews.map(e=>e.movie)
            const movies = await movieModel.find({
                _id: {$in: moviesIds}
            })
            res.json(movies)
        }catch (e){
            res.status(500).send(e.message)
        }
    })

    //get users who have rated a particular movie
    app.get('/api/movies/:id/users', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }
        try{
            const movie_id = req.params.id //movie primary key
            const reviews = await reviewsModel.find({movie: movie_id})
            let criticIds = reviews.map(e=>e.critic)
            const critics = await criticsModel.find({
                _id: {$in: criticIds}
            })
            let userIds = critics.map(e=>e.user)
            const users = await usersModel.find({
                _id: {$in: userIds}
            })
            res.json(users)
        }catch (e){
            res.status(500).send(e.message)
        }
    })

    // get all the critics who have reviewed a particular movie
    app.get('/api/movies/:id/critics', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }
        try{
            const movie_id = req.params.id //movie primary key
            const reviews = await reviewsModel.find({movie: movie_id})
            let criticIds = reviews.map(e=>e.critic)
            const critics = await criticsModel.find({
                _id: {$in: criticIds}
            })
            /*let userIds = critics.map(e=>e.user) // uncomment if you want user details
            const users = await usersModel.find({
                _id: {$in: userIds}
            })*/
            res.json(critics)
        }catch (e){
            res.status(500).send(e.message)
        }
    })

    // get ratings of users of a particular id
    app.get('/api/users/:id/ratings', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }
        try{
            const user_id = req.params.id
            const ratings = await ratingsModel.find({user: user_id})
            res.json(ratings)
        }catch (e){
            res.status(500).send(e.message)
        }
    })

    // get reviews of a particular user by user id
    app.get('/api/users/:id/reviews', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }
        try{
            const user_id = req.params.id
            const critic_id = await criticsModel.findOne({user: user_id},{"_id":1})
            const reviews = await reviewsModel.find({critic: critic_id})
            res.json(reviews)
        }catch (e){
            res.status(500).send(e.message)
        }
    })


    //get movies for a particular rating id
    app.get('/api/ratings/:id/movies', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }
        try{
            const rating_id = req.params.id
            const ratings = await ratingsModel.find({_id: rating_id})
            let reviewIds = ratings.map(e=>e.review)
            const reviews = await reviewsModel.find({
                _id: {$in: reviewIds}
            })
            let moviesIds = reviews.map(e=>e.movie)
            const movies = await movieModel.find({
                _id: {$in: moviesIds}
            })
            res.json(movies)
        }catch (e){
            res.status(500).send(e.message)
        }
    })


    // get reviews for a particular rating id
    app.get('/api/ratings/:id/reviews', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }
        try{
            const rating_id = req.params.id
            const ratings = await ratingsModel.find({_id: rating_id})
            let reviewIds = ratings.map(e=>e.review)
            const reviews = await reviewsModel.find({
                _id: {$in: reviewIds}
            })
            /* let moviesIds = reviews.map(e=>e.movie)
            const movies = await movieModel.find({
                _id: {$in: moviesIds}
            }) */ // uncomment if you want movies
            res.json(reviews)
        }catch (e){
            res.status(500).send(e.message)
        }
    })


    // get users for a particular rating id
    app.get('/api/ratings/:id/users', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }
        try{
            const rating_id = req.params.id
            const ratings = await ratingsModel.find({_id: rating_id})
            const userIds = ratings.map(e=>e.user)
            const users = await usersModel.find({
                _id: {$in: userIds}
            })
            res.json(users)
        }catch (e){
            res.status(500).send(e.message)
        }
    })


    // already done on line 91
    /*
    const getReviewsFromUserID = async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

        res.sendStatus(500)
    }
    */


    const getReviewsOfMovieFromID = async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }
        try{
            const movie_id = req.params.id
            const reviews = await reviewsModel.find({movie: movie_id})
            res.json(reviews)
        }catch (e){
            res.status(500).send(e.message)
        }
    }
    //get reviews
    // app.get('/api/users/:id/reviews', getReviewsFromUserID) // already on line 90
    app.get('/api/movies/:id/reviews', getReviewsOfMovieFromID)


}

async function testLoggedIn(_id) {
    try {
        if (_id && await usersModel.findById(_id)) {
            return true
        }
    } catch (e) {
        console.log(`DB error: ${e}`)
    }
    return false
}