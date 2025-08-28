const express = require("express")
const app = express()
//req = requisição do navegador
//res = resposta do servidor
// /?campo=valor
app.get("/",(req,res)=>{  // parametro opcional via query
    var busca = req.query["campo"]
    console.log("rota raiz requisitada")
    var saida = "Query: "+busca 
    res.send(saida)
});
//localhost:8080/IFPI/teste - "teste" é o parametro passado para conteúdo 
app.get("/IFPI/:conteudo", (req, res)=>{ //parametro obrigatorio
    var conteudo = req.params.conteudo
    var saida = "Parametro: " + conteudo;
    res.send(saida)
});
// app.get("/IFPI/:conteudo?", (req, res)=>{ //parametro opcional
//     var conteudo = req.params.conteudo
//     var saida = "Parametro: " + conteudo;
//     res.send(saida)
// });

// Quando não vem parâmetro
app.get('/busca', (req, res) => {
    res.send("Você não passou nenhum termo de busca");
});

app.get("/IFPI/Floriano", (req, res)=>{
    res.send("IFPI Campus Floriano")
});
app.listen(8080, (err)=>{
    console.log("Servidor online!")
});