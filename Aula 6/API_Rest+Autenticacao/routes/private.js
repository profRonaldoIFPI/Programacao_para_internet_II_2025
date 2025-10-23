import express from "express";
import {listUsers, deleteUser, updateUser } from "../controllers/userController.js"

const router = express.Router();

router.get("/listarUsuarios", listUsers)
router.post("/deletarUsuario", deleteUser)
router.post("/atualizarUsuario", updateUser)

export default router;