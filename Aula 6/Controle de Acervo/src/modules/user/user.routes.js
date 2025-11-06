import express from "express";
import {newUser, validateUser, listUsers, deleteUser, updateUser, elevateUser } from "./user.controller.js"
import {authenticate, authorizaAdmin} from "../../middleware/authenticate.js"

const router = express.Router();
        /* ROTAS PÚBLICAS */
router.post("/cadastro", newUser)
router.post("/login", validateUser)
        /* ROTAS PRIVADAS */
router.get("/listarUsuarios", authenticate, listUsers)
router.post("/atualizarUsuario", authenticate, updateUser)
        /* USUÁRIO ADMINISTRADORES */
router.post("/deletarUsuario", authenticate, authorizaAdmin, deleteUser)
router.post("/promoverUsuario", authenticate, authorizaAdmin, elevateUser)

export default router; 