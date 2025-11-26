import { DataTypes } from "sequelize";
import connectDB from "../../database/db.js";

const sequelize = await connectDB();

const CollectionManager = sequelize.define(
  "CollectionManagers",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    collectionId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    canManage: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    tableName: "CollectionManagers",
    timestamps: true,
  }
);

export default CollectionManager;
