import { DataTypes } from "sequelize";
import conectDB from "../database/db.js";

const sequelize = await conectDB();
const Collection = sequelize.define("Collections",{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    value: {type: DataTypes.FLOAT, allowNull: true},
});

await Collection.sync();
export default Collection;