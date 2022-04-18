import mongoose from "mongoose";

const moviesSchema = mongoose.Schema({

    imdb_id: {type: Number}, //Api

    tmdb_id: {type: Number}, //Api

    title: {type: String}, //Api

    homepage: {type: String}, //Api

    release_date: {type: String}, //Api

    overview: {type: String}, //Api

    poster_path: {type: String}, //Api

    genres: {
        g_id: Number, //Api
        g_name: String //Api
    },

    vote_average: Number

    // reviews: {type: Schema.Types.ObjectId, ref: "Review"} // ReviewID

});

// , {collection: 'movies'} (not sure yet)

export default moviesSchema;