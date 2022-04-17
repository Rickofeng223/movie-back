import mongoose from "mongoose";
import usersSchema from "./users-schema";

const usersModel = mongoose.model('User', usersSchema);

export default usersModel;