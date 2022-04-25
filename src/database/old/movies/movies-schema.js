import mongoose from "mongoose";

const moviesSchema = mongoose.Schema({

    imdb_id: {type: Number}, //Api

    tmdb_id: {type: Number}, //Api

    title: {type: String}, //Api

    homepage: {type: String}, //Api

    release_date: {type: String}, //Api

    overview: {type: String}, //Api

    poster_path: {type: String}, //Api


    genre_ids: {type : Array},
    // genres: {
    //     g_id: Number, //Api
    //     g_name: String //Api
    // },

    vote_average: Number


});


export default moviesSchema;