import express from "express";
import {newUser, validateUser, listUsers, deleteUser, updateUser, elevateUser } from "./user.controller.js"
import {authenticate, authorizaAdmin} from "../../middleware/authenticate.js"

const userRouter = express.Router();
        /* ROTAS PÚBLICAS */
userRouter.post("/cadastro", newUser)
userRouter.post("/login", validateUser)

        /* ROTAS PRIVADAS */
userRouter.get("/listarUsuarios", authenticate, listUsers)
userRouter.post("/atualizarUsuario", authenticate, updateUser)

        /* USUÁRIO ADMINISTRADORES */
userRouter.post("/deletarUsuario", authenticate, authorizaAdmin, deleteUser)
userRouter.post("/promoverUsuario", authenticate, authorizaAdmin, elevateUser)

export default userRouter; 