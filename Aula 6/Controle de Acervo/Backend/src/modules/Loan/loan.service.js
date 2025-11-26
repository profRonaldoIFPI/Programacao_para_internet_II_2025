import Loan from "./loan.model.js";

export const createLoan = (data) => Loan.create(data);

export const findAllLoans = () => Loan.findAll();

export const findLoanById = (id) => Loan.findByPk(id);

export const updateLoan = (id, data) => Loan.update(data, { where: { id } });

export const deleteLoan = (id) => Loan.destroy({ where: { id } });
