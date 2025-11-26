import express from "express";
import { authenticate, authorizeAdmin } from "../../middleware/authenticate.js";
import {
  createObjectHandler,
  deleteObjectHandler,
  listObjects,
  updateObjectHandler,
} from "./object.controller.js";

const objectRouter = express.Router();

objectRouter.get("/", authenticate, listObjects);
objectRouter.post("/", authenticate, authorizeAdmin, createObjectHandler);
objectRouter.post("/update", authenticate, authorizeAdmin, updateObjectHandler);
objectRouter.post("/delete", authenticate, authorizeAdmin, deleteObjectHandler);

export default objectRouter;
