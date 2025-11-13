import { Sequelize } from "sequelize";
import path from "node:path";
import fs from "node:fs";

const conectDB = async () => {
  try {
    const envPath = process.env.SQLITE_PATH;
    const defaultPath = path.resolve("./src/database/database.sqlite");
    const storagePath = envPath ? path.resolve(envPath) : defaultPath;

    const dir = path.dirname(storagePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: storagePath,
      logging: false,
    });

    await sequelize.authenticate();
    console.log("SQLite conectado!");
    return sequelize;
  } catch (error) {
    console.error("Erro ao conectar ao SQLite:", error);
    return null;
  }
};

export default conectDB;