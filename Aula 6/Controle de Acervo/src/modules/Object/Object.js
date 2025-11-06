import { DataTypes } from "sequelize";
import conectDB from "../database/db.js";
import Collection from "./Collection.js";

const sequelize = await conectDB();
const Object = sequelize.define("Objects",{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    value: {type: DataTypes.FLOAT, allowNull: true},
});

Object.belongsTo(Collection)
Collection.hasMany(Object)

await Object.sync();
export default Object;