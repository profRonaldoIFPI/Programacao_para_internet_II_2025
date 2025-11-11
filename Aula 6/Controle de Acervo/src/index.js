import 'dotenv/config';
import express from "express";
import conectDB from "./database/db.js";
import userRouter from './modules/User/user.routes.js';
import { authenticate, authorizaAdmin } from './middleware/authenticate.js';

const PORT = process.env.PORT;
const app = express();
app.use(express.json()); //necessário para receber json via API.

app.use('/user', userRouter); // todas as rotas de usuario

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
        console.log(`Erro de conexão com o database: ${erro}`);
    })

