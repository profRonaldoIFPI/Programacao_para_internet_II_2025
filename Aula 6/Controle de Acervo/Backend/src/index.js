import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/openapi.js";
import connectDB from "./database/db.js";
import setupAssociations from "./modules/associations.js";
import userRouter from "./modules/user/user.routes.js";
import collectionRouter from "./modules/Collection/collection.routes.js";
import objectRouter from "./modules/Object/object.routes.js";
import personRouter from "./modules/Person/person.routes.js";
import loanRouter from "./modules/Loan/loan.routes.js";
import collectionManagerRouter from "./modules/CollectionManager/collectionManager.routes.js";

const PORT = process.env.PORT || 3000;
const isDev = (process.env.NODE_ENV || "development") === "development";
const app = express();
app.use(express.json());

if (isDev) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger UI habilitado em /docs (dev mode).");
}

app.use("/user", userRouter);
app.use("/collections", collectionRouter);
app.use("/objects", objectRouter);
app.use("/people", personRouter);
app.use("/loans", loanRouter);
app.use("/collectionManagers", collectionManagerRouter);

const start = async () => {
  try {
    await connectDB();
    await setupAssociations();

    app.listen(PORT, (erro) => {
      if (!erro) {
        console.log(`Servidor online. http://localhost:${PORT}/`);
      } else {
        console.log(`Nao foi possivel executar: ${erro}`);
      }
    });
  } catch (erro) {
    console.log(`Erro de conexao com o database: ${erro}`);
  }
};

start();
