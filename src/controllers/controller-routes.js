import {manyQueries } from './manyController.js'
import {
    deleteRating,
    deleteReview,
    deleteUser,
    getCritic,
    getRating,
    getReview,
    getUser,
    getByTid,
    getMovie,
   postRating,
    postReview,
    putCritic,
    putReview,
    putRating,
    putUser} from './crud/index.js'
import {
    getSession, resetSession, setSession
} from './session-logic.js'
import signup from "./auth/signup.js";
import login from "./auth/login.js";



export default (app) => {


    // app.post('/api/movies', createMovie);
    app.get('/api/movies/tid/:tid', getByTid)
    app.get('/api/movies', getMovie);
    app.get('/api/movies/:id', getMovie);
    // app.put('/api/movies/:id', updateMovie);
    // app.delete('/api/movies/:id', removeMovie);


    //todo copy boilerplate
    app.post('/api/reviews', postReview);
    app.get('/api/reviews', getReview);
    app.get('/api/reviews/:id', getReview);
    app.put('/api/reviews/:id', putReview);
    app.delete('/api/reviews/:id', deleteReview);

    //todo boilerplate
    app.post('/api/ratings', postRating);
    app.get('/api/ratings', getRating);

    app.get('/api/ratings/:id', getRating);
    app.put('/api/ratings/:id', putRating);
    app.delete('/api/ratings/:id', deleteRating);

    // app.post('/api/users', createUser);
    app.get('/api/users', getUser);
    app.get('/api/users/:id', getUser);
    app.put('/api/users/:id', putUser);
    app.delete('/api/users/:id', deleteUser);

    // app.post('/api/critics', createCritic);
    app.get('/api/critics', getCritic);
    app.get('/api/critics/:id', getCritic);
    app.put('/api/critics/:id', putCritic);


    app.get('/api/session/set/:name/:value', setSession);
    app.get('/api/session/get/:name', getSession);
    app.get('/api/session/get/', getSession);
    // app.get('/api/session/get', getSessionAll);
    app.get('/api/session/reset', resetSession);


    app.post("/api/auth/signup", signup);
    app.post("/api/auth/login", login);
     app.post("/api/auth/logout",  function logout(req, res) {
            req.session.destroy();
            res.sendStatus(200)
        }
    );

    manyQueries(app)
    //


}
