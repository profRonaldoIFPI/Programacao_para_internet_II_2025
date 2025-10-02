import express from "express";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post("/cadastro", async (req, res)=>{
    try{
        const usuario = req.body
        const costFactor = 10; //2^10 = 1024 iterações
        usuario.password = bcrypt.hashSync(usuario.password, costFactor);
        await User.create(usuario); //C do CRUD
        res.status(201).json({message: "Usuário cadastrado."})
    }catch(erro){
        res.status(502).json({erro: `${erro}`})
    }
})

router.post("/login", async (req, res)=>{
    const usuario = req.body
    console.log(usuario)
    try{
        const user = await User.findOne({email: usuario.email});
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
})
export default router; 