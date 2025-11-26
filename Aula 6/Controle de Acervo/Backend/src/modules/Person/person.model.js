import { DataTypes } from "sequelize";
import connectDB from "../../database/db.js";

const sequelize = await connectDB();

const Person = sequelize.define(
  "Persons",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    cpf: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "Persons",
    timestamps: true,
  }
);

export default Person;
