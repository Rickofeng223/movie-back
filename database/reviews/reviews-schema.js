import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({

    movie: {type: Schema.Types.ObjectId, ref: "Movie"}, // MovieID

    user: {type: Schema.Types.ObjectId, ref: "User"}, // UserID

    content: {type: String},

    time: {type: Date}, //check if this is right or {timestamps: true}

    likes: {type: Number},

    dislikes: {type: Number},

    visibility: {type: String}

});

// , {collection: 'reviews'} (not sure yet)

export default reviewsSchema;