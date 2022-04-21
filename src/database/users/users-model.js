import mongoose from "mongoose";
import usersSchema from "./users-schema.js";

const usersModel = mongoose.model('User', usersSchema);

export default usersModel;