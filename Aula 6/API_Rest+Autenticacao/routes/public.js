import express from "express";
import bcrypt from "bcrypt";
import User from "../model/User.js";

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
export default router; 