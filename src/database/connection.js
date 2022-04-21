import mongoose from "mongoose";

export default ()=> mongoose.connect(process.env.MOVIE_DB||'mongodb://127.0.0.1:27017/movies')