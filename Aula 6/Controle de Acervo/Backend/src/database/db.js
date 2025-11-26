import { Sequelize } from "sequelize";
import path from "node:path";
import fs from "node:fs";

let sequelize;

const connectDB = async () => {
  try {
    if (sequelize) {
      return sequelize;
    }

    const storagePath = path.resolve(process.env.SQLITE_PATH || "./src/database/database.sqlite");
    const dir = path.dirname(storagePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: storagePath,
      logging: false,
    });

    await sequelize.authenticate();
    console.log("SQLite conectado!");
    return sequelize;
  } catch (error) {
    console.error("Erro ao conectar ao SQLite:", error);
    throw error;
  }
};

export default connectDB;
