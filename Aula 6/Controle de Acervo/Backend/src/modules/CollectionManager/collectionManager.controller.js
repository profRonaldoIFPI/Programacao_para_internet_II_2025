import {
  createManager,
  deleteManager,
  findManagerById,
  findManagers,
  updateManager,
} from "./collectionManager.service.js";

export const listManagers = async (req, res) => {
  try {
    const { collectionId } = req.query;
    const managers = await findManagers(collectionId);
    return res.status(200).json({ message: "Gestores carregados.", managers });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar gestores.", error: error.message });
  }
};

export const createManagerHandler = async (req, res) => {
  try {
    const { collectionId, userId } = req.body;
    if (!collectionId || !userId) {
      return res.status(400).json({ message: "collectionId e userId sao obrigatorios." });
    }

    const manager = await createManager(req.body);
    return res.status(201).json({ message: "Gestor adicionado.", manager });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao adicionar gestor.", error: error.message });
  }
};

export const updateManagerHandler = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id do gestor obrigatorio." });
    }

    const [affected] = await updateManager(id, data);
    if (!affected) {
      return res.status(404).json({ message: "Gestor nao encontrado." });
    }

    const manager = await findManagerById(id);
    return res.status(200).json({ message: "Gestor atualizado.", manager });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao atualizar gestor.", error: error.message });
  }
};

export const deleteManagerHandler = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id do gestor obrigatorio." });
    }

    const deleted = await deleteManager(id);
    if (!deleted) {
      return res.status(404).json({ message: "Gestor nao encontrado." });
    }

    return res.status(200).json({ message: "Gestor removido." });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao remover gestor.", error: error.message });
  }
};
