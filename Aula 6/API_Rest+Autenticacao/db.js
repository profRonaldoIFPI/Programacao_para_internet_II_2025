//conexão com o mongo
import mongoose from "mongoose";

const conectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://ronaldopb_db_user:em5UiHb7UbBb1u2q@servidoraulasppiii.e7oulzt.mongodb.net/?ServidorAulasPPIIIretryWrites=true&w=majority&appName=ServidorAulasPPIII");

        console.log("Conectado ao MongoDB!");
    } catch(erro){
        console.log(`Conexão com MongoDB falhou:${erro}`)
    }
}

export default conectDB;