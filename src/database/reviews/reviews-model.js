import mongoose from "mongoose";
import reviewsSchema from "./reviews-schema.js";

const reviewsModel = mongoose.model('Review', reviewsSchema);

export default reviewsModel;