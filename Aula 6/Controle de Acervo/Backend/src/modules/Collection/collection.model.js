import { DataTypes } from "sequelize";
import connectDB from "../../database/db.js";

const sequelize = await connectDB();

const Collection = sequelize.define(
  "Collections",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.FLOAT, allowNull: true },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "Collections",
    timestamps: true,
  }
);

export default Collection;
