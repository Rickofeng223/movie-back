import mongoose from "mongoose";

const usersSchema = mongoose.Schema({

    username: {type: String, required: true},

    password: {type: String, required: true},

    first_name: {type: String, required: true},

    last_name: {type: String, required: true},

    email_id: {type: String},

    phone_no:{type: String},

    DOB: {type: Date}

    // reviews: {type: Schema.Types.ObjectId, ref: "Review"} // ReviewID

    });

// , {collection: 'users'} (not sure yet)

export default usersSchema;