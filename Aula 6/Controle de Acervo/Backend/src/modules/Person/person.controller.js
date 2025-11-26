import {
  createPerson,
  deletePerson,
  findAllPeople,
  findPersonById,
  updatePerson,
} from "./person.service.js";

export const listPeople = async (_req, res) => {
  try {
    const people = await findAllPeople();
    return res.status(200).json({ message: "Pessoas carregadas.", people });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar pessoas.", error: error.message });
  }
};

export const createPersonHandler = async (req, res) => {
  try {
    const person = await createPerson(req.body);
    return res.status(201).json({ message: "Pessoa criada.", person });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao criar pessoa.", error: error.message });
  }
};

export const updatePersonHandler = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id da pessoa obrigatorio." });
    }

    const [affected] = await updatePerson(id, data);
    if (!affected) {
      return res.status(404).json({ message: "Pessoa nao encontrada." });
    }

    const person = await findPersonById(id);
    return res.status(200).json({ message: "Pessoa atualizada.", person });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao atualizar pessoa.", error: error.message });
  }
};

export const deletePersonHandler = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id da pessoa obrigatorio." });
    }

    const deleted = await deletePerson(id);
    if (!deleted) {
      return res.status(404).json({ message: "Pessoa nao encontrada." });
    }

    return res.status(200).json({ message: "Pessoa removida." });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao remover pessoa.", error: error.message });
  }
};
