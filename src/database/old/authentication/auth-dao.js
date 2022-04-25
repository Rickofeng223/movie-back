import model from './auth-model.js'

export const setPassword = (id ,password)=>model.updateOne({ _id:id}, {password})
export const getPassFromUsername=async  (_id,user)=>(await model . find({_id,user}))[0].password
export const createAuth = (user ,oid,password)=> model.create({_id:user,user:oid,password})
