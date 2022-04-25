import {usersModel} from "../database/schema-files.js";

export function manyQueries(app) {

    //get critics
    app.get('/api/critics/:id/movies', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

        res.sendStatus(500)
    })

    //get movies
    app.get('/api/movies/:id/users', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

        res.sendStatus(500)
    })
    app.get('/api/movies/:id/critics', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

        res.sendStatus(500)
    })


    //get users
    app.get('/api/users/:id/movies', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

        res.sendStatus(500)
    })
    app.get('/api/users/:id/ratings', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

        res.sendStatus(500)
    })
    app.get('/api/users/:id/reviews', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

        res.sendStatus(500)
    })


    //get ratings
    app.get('/api/ratings/:id/movies', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

        res.sendStatus(500)
    })
    app.get('/api/ratings/:id/reviews', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

        res.sendStatus(500)
    })
    app.get('/api/ratings/:id/users', async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

        res.sendStatus(500)
    })


    const getReviewsFromUserID = async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

        res.sendStatus(500)
    }
    const getReviewsOfMovieFromID = async (req, res) => {
        let loggedIn = await testLoggedIn(req)
        if (!loggedIn) {
            res.status(403).send("Must be logged in!")
            return
        }

res.sendStatus(500)
    }
    //get reviews
    app.get('/api/reviews/:id/users', getReviewsFromUserID)
    app.get('/api/reviews/:id/movies', getReviewsOfMovieFromID)


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