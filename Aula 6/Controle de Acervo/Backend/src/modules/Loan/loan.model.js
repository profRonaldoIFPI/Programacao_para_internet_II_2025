import { DataTypes } from "sequelize";
import connectDB from "../../database/db.js";

const sequelize = await connectDB();

const Loan = sequelize.define(
  "Loans",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    loanDate: { type: DataTypes.DATEONLY, allowNull: false },
    repaymentDate: { type: DataTypes.DATEONLY, allowNull: false },
    itIsBack: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
    notes: { type: DataTypes.TEXT, allowNull: true },
    personId: { type: DataTypes.INTEGER, allowNull: false },
    objectId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "Loans",
    timestamps: true,
  }
);

export default Loan;
