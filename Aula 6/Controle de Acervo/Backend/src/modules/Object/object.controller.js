import {
  createObject,
  deleteObject,
  findAllObjects,
  findObjectById,
  updateObject,
} from "./object.service.js";

export const listObjects = async (_req, res) => {
  try {
    const objects = await findAllObjects();
    return res.status(200).json({ message: "Objetos carregados.", objects });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar objetos.", error: error.message });
  }
};

export const createObjectHandler = async (req, res) => {
  try {
    const { collectionId } = req.body;
    if (!collectionId) {
      return res.status(400).json({ message: "collectionId obrigatorio." });
    }
    const object = await createObject(req.body);
    return res.status(201).json({ message: "Objeto criado.", object });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao criar objeto.", error: error.message });
  }
};

export const updateObjectHandler = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id do objeto obrigatorio." });
    }

    const [affected] = await updateObject(id, data);
    if (!affected) {
      return res.status(404).json({ message: "Objeto nao encontrado." });
    }

    const object = await findObjectById(id);
    return res.status(200).json({ message: "Objeto atualizado.", object });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao atualizar objeto.", error: error.message });
  }
};

export const deleteObjectHandler = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id do objeto obrigatorio." });
    }

    const deleted = await deleteObject(id);
    if (!deleted) {
      return res.status(404).json({ message: "Objeto nao encontrado." });
    }

    return res.status(200).json({ message: "Objeto removido." });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao remover objeto.", error: error.message });
  }
};
