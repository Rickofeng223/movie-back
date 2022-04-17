import mongoose from "mongoose";
import reviewsSchema from "./reviews-schema";

const reviewsModel = mongoose.model('Review', reviewsSchema);

export default reviewsModel;