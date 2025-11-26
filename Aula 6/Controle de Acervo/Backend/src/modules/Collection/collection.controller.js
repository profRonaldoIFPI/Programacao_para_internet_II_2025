import {
  createCollection,
  deleteCollection,
  findAllCollections,
  findCollectionById,
  updateCollection,
} from "./collection.service.js";

export const listCollections = async (_req, res) => {
  try {
    const collections = await findAllCollections();
    return res.status(200).json({ message: "Collections loaded.", collections });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar colecoes.", error: error.message });
  }
};

export const createCollectionHandler = async (req, res) => {
  try {
    const ownerId = req.user?.userId ?? req.body.ownerId;
    if (!ownerId) {
      return res.status(400).json({ message: "ownerId obrigatorio (derivado do token)." });
    }

    const collection = await createCollection({ ...req.body, ownerId });
    return res.status(201).json({ message: "Colecao criada.", collection });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao criar colecao.", error: error.message });
  }
};

export const updateCollectionHandler = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id da colecao obrigatorio." });
    }

    const [affected] = await updateCollection(id, data);
    if (!affected) {
      return res.status(404).json({ message: "Colecao nao encontrada." });
    }

    const collection = await findCollectionById(id);
    return res.status(200).json({ message: "Colecao atualizada.", collection });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao atualizar colecao.", error: error.message });
  }
};

export const deleteCollectionHandler = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id da colecao obrigatorio." });
    }

    const deleted = await deleteCollection(id);
    if (!deleted) {
      return res.status(404).json({ message: "Colecao nao encontrada." });
    }

    return res.status(200).json({ message: "Colecao removida." });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao remover colecao.", error: error.message });
  }
};
