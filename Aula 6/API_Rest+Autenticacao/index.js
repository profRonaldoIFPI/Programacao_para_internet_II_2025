import express from "express";
import publicRoutes from "./routes/public.js"

const PORT = 3000;
const app = express();
app.use(express.json()); //necessário para receber json via API.

app.use('/', publicRoutes);

app.listen(PORT,(erro)=>{
    if(!erro){
        console.log(`Servidor online. http://localhost:${PORT}/`)
    }else{
        console.log(`Não foi possível executar: ${erro}`)
    }
})