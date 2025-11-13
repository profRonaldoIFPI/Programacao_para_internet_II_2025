//CRUD de User
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {createUser, 
    findAllUsers, 
    findUserByEmail,
    update,
    findUserById} from "./user.services.js"

const secret = process.env.SECRET_JWT

//CREATE
export const newUser = async (req, res) => {
    try{
        await createUser(req.body)
        res.status(201).json({message: "Usuário cadastrado."})
    }catch(erro){
        res.status(502).json({erro: `${erro}`})
    }
}
//READ 
export const listUsers = async (req, res) =>{
    try{
        const users = await findAllUsers()
        if(!users){
            return res.status(404).json({message: "Não há registros."})
        }
        res.status(200).json({message: "Lista carregada com sucesso. ", users})
    }catch(erro){
        res.status(500).json({message:  `Erro interno:( \n${erro}`})
    }
}
export const validateUser = async (req, res)=>{
    const usuario = req.body
    try{
        const user = await findUserByEmail(usuario.email)
        if(!user){
            return res.status(401).json({message: "Usuário não cadastrado."})
        }
        if (!bcrypt.compare(usuario.password, user.password)){
            return res.status(401).json({message: "Senha inválida."})
        }
        const token = jwt.sign(
                            {userId: user._id, isAdmin: user.isAdmin},
                            process.env.SECRET_JWT,
                            {expiresIn: "2h"} // s, m, h, d, w ,M, y
                        )
        res.status(200).json({message: "Login realizado.", token})
    }catch(erro){
        res.status(500).json({message:  `Deu ruim :( \n${erro}`})
    }
}
/*
    CRIE UMA FUNÇÃO PARA BUSCAR USUÁRIOS POR E-MAIL OU ID
*/
//UPDATE
export const updateUser = async (req, res) =>{
    try{
        const user = req.body
        await update(user)
        res.status(200).json({message: "Usuário atualizado com sucesso."})
    }catch(erro){
        res.status(400).json({message:  `Erro:( \n${erro}`})
    }
}
export const elevateUser = async (req, res) =>{
    try{
        let user = req.body
        user.isActive = true
        await update(user)
        res.status(200).json({message: "Usuário promovido com sucesso."})
    }catch(erro){
        res.status(400).json({message:  `Erro:( \n${erro}`})
    }
}

//DELETE
export const deleteUser = async (req, res) =>{
    try{
        const user = req.body
        console.log(user)
    /*
        DELETAR REGISTRO! DEVEMOS PERMITIR ISSO? HÁ CONSEQUÊNCIAS?
        await User.destroy(user, {where: {id: user._id}})
        res.status(200).json({message: "Usuário deletado com sucesso."})
    */
        user.isActive = false
        await update(user)
        res.status(200).json({message: "Usuário desativado com sucesso."})
    }catch(erro){
        res.status(400).json({message:  `Erro:( \n${erro}`})
    }
}