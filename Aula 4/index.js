const express = require("express")
const app = express()
const controller = require("./controller")

app.set("view engine", "ejs")

app.get("/:texto", (req, res)=>{
    var texto = req.params.texto
    res.render(
        "pagina", //template
        {
        texto: texto
        }
    )
})

app.use("/user", controller)
app.use("/products", controller)

app.listen(8080, (err)=>{
    console.log("Servidor online!")
});