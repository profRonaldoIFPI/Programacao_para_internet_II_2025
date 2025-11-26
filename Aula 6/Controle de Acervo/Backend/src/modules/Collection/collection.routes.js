import express from "express";
import { authenticate, authorizeAdmin } from "../../middleware/authenticate.js";
import {
  createCollectionHandler,
  deleteCollectionHandler,
  listCollections,
  updateCollectionHandler,
} from "./collection.controller.js";

const collectionRouter = express.Router();

collectionRouter.get("/", authenticate, listCollections);
collectionRouter.post("/", authenticate, authorizeAdmin, createCollectionHandler);
collectionRouter.post("/update", authenticate, authorizeAdmin, updateCollectionHandler);
collectionRouter.post("/delete", authenticate, authorizeAdmin, deleteCollectionHandler);

export default collectionRouter;
