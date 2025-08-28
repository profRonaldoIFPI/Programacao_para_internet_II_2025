const express = require("express")
const router = express.Router()
//request, response
router.get("/",(req,res)=>{
    res.send("Esta resposta vem do controller")
})

router.get("/rota2",(req,res)=>{
    res.send("Rota 2")
})
module.exports = router 