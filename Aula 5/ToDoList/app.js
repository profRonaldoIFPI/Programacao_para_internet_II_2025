const express = require('express');
const app = express();

app.set("view engine", "ejs") //configura o motor de render
app.use(express.urlencoded({extended: true})) //decondificador POST

app.get("/tasks",(req,res)=>{
    res.render("index");
})

app.listen(3000,(err)=>{
    console.log("Servidor online.")
})