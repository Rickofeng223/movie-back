import mongoose from "mongoose";

export default mongoose.Schema({

    _id:{type:String ,required:true},

    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, // UserID

    username: {type: String, required: true},

    password: {type: String, required: true},

})