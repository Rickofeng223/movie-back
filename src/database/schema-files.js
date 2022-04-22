import mongoose from "mongoose";

const {Schema, model, connect} = mongoose, {Types} = Schema, {ObjectId} = Types


/*


movies are reviewed by many people
reviews --
users create many reviews of actors
      create many reviews of movies
actors
    create many reviews
    are reviewed by   many users
auth
    one per user
profiles
    one per user


*/

export const movieModel = model("Movie", Schema({

    imdb_id: {type: Number}, //Api

    tmdb_id: {type: Number}, //Api

    title: {type: String}, //Api

    homepage: {type: String}, //Api

    release_date: {type: String}, //Api

    overview: {type: String}, //Api

    poster_path: {type: String}, //Api

    genre_ids: {type: Array},

    vote_average: Number


}))
export const reviewsModel = model("Reviews", Schema({

    movie: {type: ObjectId, ref: "Movie", required: true}, // MovieID   movie being reviewed

    user: {type: ObjectId}, // any type of user

    actor: {type: ObjectId, ref: "Actor"}, // actor being reviewed

    content: {type: String},

    time: {type: Date}, //check if this is right or {timestamps: true}

    likes: {type: Number},

    dislikes: {type: Number},

    visibility: {type: String}

}))


export const usersModel = model("User", Schema({

    username: {type: String, required: true},


    role: [
        {
            type: String,
            enum: ['USER', 'ACTOR', 'ADMIN'],
        },
    ],
    profile_id: {type: ObjectId, ref: "Profile"}

}));

export const actorsModel = model("Actor", Schema({
    actor_id: {type: Number, required: true}, //Api
    known_for_department: {type: String},
    name: {type: String, required: true},
    original_name: {type: String, required: true},
    profile_id: {type: ObjectId, ref: "Profile"}

}))

export const profileModel = model("Profile", Schema({
    first_name: {type: String, required: true},

    last_name: {type: String, required: true},

    email_id: {type: String},

    phone_no: {type: String},

    DOB: {type: Date}
}));