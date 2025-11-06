import { Sequelize } from "sequelize";
import path from "node:path"
let sequelize;
const conectDB = async () => {
  try {
    const dbpath = process.env.SQLITE_PATH;
    sequelize = new Sequelize({
                  dialect: "sqlite",
                  storage: path.resolve(dbpath),
                  logging: false
                }) 
    sequelize.authenticate()            
    console.log("SQLite conectado!");
    return sequelize
  } catch (error) {
    console.error("Erro ao conectar ao SQLite:", error);
    return null
  }
};
export default conectDB;