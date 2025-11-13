//definição dos dados
import { DataTypes } from "sequelize";
import conectDB from "../../database/db.js";

const sequelize = await conectDB()
const User = sequelize.define("Users",{
    id: {  //do jeito que está é opcional, pois o sequelize faz exatamente isso 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    name:       {type: DataTypes.STRING, allowNull: false,},
    email:      {type: DataTypes.STRING, allowNull: false, unique: true,},
    password:   {type: DataTypes.STRING, allowNull: false,},
    isAdmin:    {type: DataTypes.BOOLEAN, defaultValue: false,},
    isActive:   {type: DataTypes.BOOLEAN, defaultValue: true,},
})

await User.sync();

export default User;