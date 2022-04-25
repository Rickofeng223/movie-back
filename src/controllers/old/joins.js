 



import {joinDao as dao} from '../../db.js'










 export default function(app){
 	    app.get('/api/movies/:id/users',moviesReviewedByUser)
 	    app.get('/api/reviews/:id/movies',reviewsOfMovie)
 	    app.get('/api/reviews/:id/users',reviewsByUser)
 	    app.get('/api/users/:id/movies',usersThatRatedMovie)

 }

async function reviewsOfMovie(req,res){
 	   const reviews = await   dao.reviewJoinMovies( req.params.id)
	   res.send(reviews)

}
async function reviewsByUser(req,res){
 	   const reviews = await  dao.userJoinReviews( req.params.id)
	   res.send(reviews)
}
async function moviesReviewedByUser(req,res){
 	   const movies = await   dao.moviesFromUserJoinReviews( req.params.id)
	   res.send(movies)
}
async function usersThatRatedMovie(req,res){

 	   const movies = await    dao.usersThatRatedMovie( req.params.id)
	   res.send(movies)
}

