import reviewsModel from "./reviews-model.js";
import mongoose from "mongoose";

// define and export CRUD operations here

export const findAll = () => reviewsModel.find();
export const findById = (id) => reviewsModel.findById(id);
export const create = (doc) => reviewsModel.create(doc);
export const deleteByID = (id) => reviewsModel.deleteOne({_id: id});
export const updateByID = (id, doc) => reviewsModel.updateOne({_id: id}, {$set: doc})

