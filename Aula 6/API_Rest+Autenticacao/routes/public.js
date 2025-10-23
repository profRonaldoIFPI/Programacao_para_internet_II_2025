import express from "express";
import {newUser,validateUser} from "../controllers/userController.js"

const router = express.Router();

router.post("/cadastro", newUser)
router.post("/login", validateUser)

export default router; 