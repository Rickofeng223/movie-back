import mongoose from "mongoose";

const moviesSchema = mongoose.Schema({

    tmdb_id: {type: Number},

    title: {type: String},

    homepage: {type: String},

    release_date: {type: String},

    overview: {type: String},

    poster_path: {type: String},

    genres: {
        g_id: Number,
        g_name: String
    },

    vote_average: Number,

    reviews: {type: Schema.Types.ObjectId, ref: "Review"} // ReviewID

});

// , {collection: 'movies'} (not sure yet)

export default moviesSchema;