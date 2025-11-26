import express from "express";
import { authenticate, authorizeAdmin } from "../../middleware/authenticate.js";
import {
  createPersonHandler,
  deletePersonHandler,
  listPeople,
  updatePersonHandler,
} from "./person.controller.js";

const personRouter = express.Router();

personRouter.get("/", authenticate, listPeople);
personRouter.post("/", authenticate, authorizeAdmin, createPersonHandler);
personRouter.post("/update", authenticate, authorizeAdmin, updatePersonHandler);
personRouter.post("/delete", authenticate, authorizeAdmin, deletePersonHandler);

export default personRouter;
