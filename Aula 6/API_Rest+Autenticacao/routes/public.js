import express from "express"
const router = express.Router();
//CRUD
//C = Create 
router.post("/cadastro",(req, res)=>{
    console.log(req)
    const usuario = req.body
    res.json(usuario)// gravar no MongoDB
})
//R = Retreave/Recuperar
//login
//U = Update
//D = Delete
export default router; 