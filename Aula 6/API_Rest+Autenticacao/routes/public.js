import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.post("/cadastro", async (req, res)=>{
    try{
        await mongoose.connect("mongodb+srv://ronaldopb_db_user:em5UiHb7UbBb1u2q@servidoraulasppiii.e7oulzt.mongodb.net/?ServidorAulasPPIIIretryWrites=true&w=majority&appName=ServidorAulasPPIII");
        console.log(req)
        const usuario = req.body
        res.json(usuario)//gravar no MongoDB
    }catch(erro){

    }
})

export default router; 