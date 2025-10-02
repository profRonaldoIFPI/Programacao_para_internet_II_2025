import express from "express";
import User from "../model/User.js"; //mongodb

const router = express.Router();

router.get("/listarUsuarios",async (req, res)=>{
    try{
        const users = await User.find().select("-password");
        if(!users){
            return res.status(404).json({message: "Não há registros."})
        }
        res.status(200).json({message: "Lista carregada com sucesso. ", users})
    }catch(erro){
        res.status(500).json({message:  `Deu ruim :( \n${erro}`})
    }
})

export default router;