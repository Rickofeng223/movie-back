import usersModel from "./users-model.js";

// define and export CRUD operations here

export const findAll = () => usersModel.find();
export const findById = (id) => usersModel.findById(id);
export const create = (doc) => usersModel.create(doc);
export const deleteOne = (id) => usersModel.deleteOne({_id: id});
export const updateByID = (id, doc) => usersModel.updateOne({_id: id}, {$set: doc})
