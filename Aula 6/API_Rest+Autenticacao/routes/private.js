import express from "express";
import {listUsers, deleteUser, updateUser } from "../controllers/userController.js"
import authorizaAdmin from "../middleware/authenticate.js"

const router = express.Router();
/* USUÁRIOS COMUNS */
router.get("/listarUsuarios", listUsers)
router.post("/atualizarUsuario", updateUser)

/* USUÁRIO ADMINISTRADORES */
router.post("/deletarUsuario",authorizaAdmin, deleteUser)

// CRIAR ROTA PARA ELEVAR PRIVILÉGIOS DE USUÁRIO

export default router;