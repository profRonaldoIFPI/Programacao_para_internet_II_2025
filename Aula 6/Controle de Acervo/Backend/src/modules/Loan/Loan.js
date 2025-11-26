import { DataTypes } from "sequelize";
import conectDB from "../database/db.js";
import Object from "./Object.js";
import Person from "./Person.js";

const sequelize = await conectDB();
const Loan = sequelize.define("Loans",{
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
   personId:{type: DataTypes.INTEGER, allowNull: false },
   objetoId:{type: DataTypes.INTEGER,  allowNull: false },
   loanDate:{type: DataTypes.DATEONLY, allowNull: false},
   repaymentDate: {type: DataTypes.DATEONLY, allowNull: false},
   itIsBack:{type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
});

// relacionamento de muitos para muitos
Person.belongsToMany(Object, {through: Loan})
Object.belongsToMany(Person, {through: Loan})

Loan.belongsTo(Person)
Person.hasMany(Loan)
Loan.belongsTo(Object)
Object.hasMany(Loan)

await Loan.sync();
export default Loan;