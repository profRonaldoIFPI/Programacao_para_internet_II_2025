import express from "express";
import { newUser, validateUser, listUsers, deleteUser, updateUser, elevateUser } from "./user.controller.js";
import { authenticate, authorizeAdmin } from "../../middleware/authenticate.js";

const userRouter = express.Router();
/* ROTAS PUBLICAS */
userRouter.post("/cadastro", newUser);
userRouter.post("/login", validateUser);

/* ROTAS PRIVADAS */
userRouter.get("/listarUsuarios", authenticate, listUsers);
userRouter.post("/atualizarUsuario", authenticate, updateUser);

/* USUARIO ADMINISTRADORES */
userRouter.post("/deletarUsuario", authenticate, authorizeAdmin, deleteUser);
userRouter.post("/promoverUsuario", authenticate, authorizeAdmin, elevateUser);

export default userRouter;
