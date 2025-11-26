import express from "express";
import { authenticate, authorizeAdmin } from "../../middleware/authenticate.js";
import {
  createManagerHandler,
  deleteManagerHandler,
  listManagers,
  updateManagerHandler,
} from "./collectionManager.controller.js";

const collectionManagerRouter = express.Router();

collectionManagerRouter.get("/", authenticate, authorizeAdmin, listManagers);
collectionManagerRouter.post("/", authenticate, authorizeAdmin, createManagerHandler);
collectionManagerRouter.post("/update", authenticate, authorizeAdmin, updateManagerHandler);
collectionManagerRouter.post("/delete", authenticate, authorizeAdmin, deleteManagerHandler);

export default collectionManagerRouter;
