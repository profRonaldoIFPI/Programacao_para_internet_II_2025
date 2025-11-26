import { DataTypes } from "sequelize";
import connectDB from "../../database/db.js";

const sequelize = await connectDB();

const ObjectModel = sequelize.define(
  "Objects",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.FLOAT, allowNull: true },
    collectionId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "Objects",
    timestamps: true,
  }
);

export default ObjectModel;
