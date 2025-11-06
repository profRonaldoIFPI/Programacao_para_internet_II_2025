import { DataTypes } from "sequelize";
import conectDB from "../database/db.js"

const sequelize = await conectDB();
const Person = sequelize.define("Persons",{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    cpf: {type: DataTypes.STRING, allowNull: false},
}); 

await Person.sync()
export default Person