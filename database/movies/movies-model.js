import mongoose from "mongoose";
import moviesSchema from "./movies-schema";

const moviesModel = mongoose.model('Movie', moviesSchema);

export default moviesModel;