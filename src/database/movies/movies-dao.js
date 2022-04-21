import movieModel from "./movies-model.js";

export const findByTID =     (tmdb_id)=> movieModel.find({tmdb_id})


// define and export CRUD operations here



export const findAll = ()=> movieModel.find();
export const findById = (id) => movieModel.findById(id);
export const create = (doc) => movieModel.create(doc);
export const deleteOne = (id) => movieModel.deleteOne({_id: id});
export const updateByID = (id, doc) => movieModel.updateOne({_id: id}, {$set: doc})

