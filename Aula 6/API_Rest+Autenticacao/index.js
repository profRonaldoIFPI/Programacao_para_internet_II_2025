import 'dotenv/config';
import express from "express";
import conectDB from "./db.js";
import publicRoutes from "./routes/public.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json()); //necessário para receber json via API.

app.use('/', publicRoutes);

//esta função é assíncrona e vamos tratar a "Promisse"
conectDB()
    .then(()=>{ //se conectDB funcionar...
        app.listen(PORT,(erro)=>{
            if(!erro){
                console.log(`Servidor online. http://localhost:${PORT}/`)
            }else{
                console.log(`Não foi possível executar: ${erro}`)
            }
        }) 
    })
    .catch((erro)=>{
        console.log(`Erro de conexão com o MongoDB: ${erro}`);
    })

