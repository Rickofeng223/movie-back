import mongoose from "mongoose";

const {Schema, model} = mongoose, {Types} = Schema, {ObjectId} = Types

export const usersModel = model("User", Schema({
            username: {type: String, required: true},
            first_name: {type: String, required: true},
            last_name: {type: String, required: true},
            email_id: {type: String},
            phone_no: {type: String},
            DOB: {type: Date},
            role:
                {
                    type: String,
                    enum: ['NORMAL', 'CRITIC', 'ADMIN'],
                    required:true
               },
        }, {
            collection: 'users'
        }
    ))
;

export const movieModel = model("Movie", Schema({

    tmdb_id: {type: Number}, //Api
    title: {type: String}, //Api
    homepage: {type: String}, //Api
    release_date: {type: String}, //Api
    overview: {type: String}, //Api
    poster_path: {type: String}, //Api
    genre_ids: {type: Array},
    vote_average: Number
}, {collection: 'movies'}));


export const criticsModel = model("Critic", Schema({

    user: {type: ObjectId, ref: "User"},
    experience: Number,
    organisation: String,

}, {collection: 'critics'}));

export const reviewsModel = model("Review", Schema({
    movie: {type: ObjectId, ref: 'Movie', required: true}, // MovieID   movie being reviewed
    critic: {type: ObjectId, ref: 'Critic'}, // only critics
    content: {type: String},
    rating: {type: Number},
    likes: {type: Number},
    dislikes: {type: Number},
    time: {type: Date}, //check if this is right or {timestamps: true}
    visibility: {type: String} // do we need this
}, {collection: 'reviews'}));

export const ratingsModel = model("Rating", Schema({
    user: {type: ObjectId, ref: 'User'},
    review: {type: ObjectId, ref: 'Review'},
    time: {type: Date}, //check if this is right or {timestamps: true}
    liked: {type: Boolean},
    disliked: {type: Boolean}
}, {collection: 'ratings'}));

export const authModel = model("Auth", Schema({


    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, // UserID

    username: {type: String, required: true},

    password: {type: String, required: true},

}))