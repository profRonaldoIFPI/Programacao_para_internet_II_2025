import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findAllUsers,
  findUserByEmail,
  update,
} from "./user.services.js";

const secret = process.env.SECRET_JWT;

export const newUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: "Usuario cadastrado.", user });
  } catch (erro) {
    res.status(502).json({ erro: `${erro}` });
  }
};

export const listUsers = async (_req, res) => {
  try {
    const users = await findAllUsers();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Nao ha registros." });
    }
    res.status(200).json({ message: "Lista carregada com sucesso.", users });
  } catch (erro) {
    res.status(500).json({ message: `Erro interno:( \n${erro}` });
  }
};

export const validateUser = async (req, res) => {
  const usuario = req.body;
  try {
    const user = await findUserByEmail(usuario.email);
    if (!user) {
      return res.status(401).json({ message: "Usuario nao cadastrado." });
    }
    const isValid = await bcrypt.compare(usuario.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Senha invalida." });
    }
    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, secret, {
      expiresIn: "2h",
    });
    res.status(200).json({ message: "Login realizado.", token });
  } catch (erro) {
    res.status(500).json({ message: `Deu ruim :( \n${erro}` });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = req.body;
    if (!user.id) {
      return res.status(400).json({ message: "Id obrigatorio." });
    }
    const [updated] = await update(user);
    if (!updated) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }
    res.status(200).json({ message: "Usuario atualizado com sucesso." });
  } catch (erro) {
    res.status(400).json({ message: `Erro:( \n${erro}` });
  }
};

export const elevateUser = async (req, res) => {
  try {
    const user = { ...req.body, isAdmin: true, isActive: true };
    if (!user.id) {
      return res.status(400).json({ message: "Id obrigatorio." });
    }
    const [updated] = await update(user);
    if (!updated) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }
    res.status(200).json({ message: "Usuario promovido com sucesso." });
  } catch (erro) {
    res.status(400).json({ message: `Erro:( \n${erro}` });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = { ...req.body, isActive: false };
    if (!user.id) {
      return res.status(400).json({ message: "Id obrigatorio." });
    }
    const [updated] = await update(user);
    if (!updated) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }
    res.status(200).json({ message: "Usuario desativado com sucesso." });
  } catch (erro) {
    res.status(400).json({ message: `Erro:( \n${erro}` });
  }
};
