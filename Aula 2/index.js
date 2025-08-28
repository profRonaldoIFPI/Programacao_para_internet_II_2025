const express = require('express');
const app = express();
app.get('/teste', (req, res) => {
    res.send("Olá Express!");
});
app.get('/rota2', (req, res) => {
    res.send("Rota 2!");
});


app.listen(8080,(erro)=>{
    if (erro) {
        console.log("Erro ao iniciar o servidor:", erro);
    } else {
        console.log("Servidor rodando na porta 8080");
    }
});