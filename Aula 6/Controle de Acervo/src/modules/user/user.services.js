import bcrypt from "bcrypt";
import User from "./user.model.js";
export const createUser = async (user)=>{
    const costFactor = 10; //2^10 = 1024 iterações
    user.password = bcrypt.hashSync(user.password, costFactor);
    return User.create(user);
}
export const findAllUsers = async () =>{
    return User.findAll({attributes: {exclude: "password"},})
}
export const findUserById = async (userId) =>{
    return User.findOne({ where: {id: userId}})
}
export const findUserByEmail = async (email) =>{
    return User.findOne({ where: {email: email}})
}
export const update = async (user) =>{
    return User.update(user, {where: {id: user.id}})
}