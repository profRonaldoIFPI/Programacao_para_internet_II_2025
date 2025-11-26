import express from "express";
import { authenticate, authorizeAdmin } from "../../middleware/authenticate.js";
import {
  createLoanHandler,
  deleteLoanHandler,
  listLoans,
  updateLoanHandler,
} from "./loan.controller.js";

const loanRouter = express.Router();

loanRouter.get("/", authenticate, listLoans);
loanRouter.post("/", authenticate, authorizeAdmin, createLoanHandler);
loanRouter.post("/update", authenticate, authorizeAdmin, updateLoanHandler);
loanRouter.post("/delete", authenticate, authorizeAdmin, deleteLoanHandler);

export default loanRouter;
