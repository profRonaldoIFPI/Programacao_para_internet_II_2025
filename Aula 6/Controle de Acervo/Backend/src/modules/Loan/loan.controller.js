import {
  createLoan,
  deleteLoan,
  findAllLoans,
  findLoanById,
  updateLoan,
} from "./loan.service.js";

export const listLoans = async (_req, res) => {
  try {
    const loans = await findAllLoans();
    return res.status(200).json({ message: "Emprestimos carregados.", loans });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar emprestimos.", error: error.message });
  }
};

export const createLoanHandler = async (req, res) => {
  try {
    const { personId, objectId } = req.body;
    if (!personId || !objectId) {
      return res.status(400).json({ message: "personId e objectId sao obrigatorios." });
    }
    const loan = await createLoan(req.body);
    return res.status(201).json({ message: "Emprestimo criado.", loan });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao criar emprestimo.", error: error.message });
  }
};

export const updateLoanHandler = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id do emprestimo obrigatorio." });
    }

    const [affected] = await updateLoan(id, data);
    if (!affected) {
      return res.status(404).json({ message: "Emprestimo nao encontrado." });
    }

    const loan = await findLoanById(id);
    return res.status(200).json({ message: "Emprestimo atualizado.", loan });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao atualizar emprestimo.", error: error.message });
  }
};

export const deleteLoanHandler = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id do emprestimo obrigatorio." });
    }

    const deleted = await deleteLoan(id);
    if (!deleted) {
      return res.status(404).json({ message: "Emprestimo nao encontrado." });
    }

    return res.status(200).json({ message: "Emprestimo removido." });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao remover emprestimo.", error: error.message });
  }
};
