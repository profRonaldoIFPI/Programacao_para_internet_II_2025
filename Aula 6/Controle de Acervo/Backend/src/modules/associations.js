import connectDB from "../database/db.js";
import User from "./user/user.model.js";
import Collection from "./Collection/collection.model.js";
import ObjectModel from "./Object/object.model.js";
import Person from "./Person/person.model.js";
import Loan from "./Loan/loan.model.js";
import CollectionManager from "./CollectionManager/collectionManager.model.js";

const setupAssociations = async () => {
  const sequelize = await connectDB();

  User.hasMany(Collection, { foreignKey: "ownerId", as: "collections" });
  Collection.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

  Collection.hasMany(ObjectModel, { foreignKey: "collectionId", as: "objects" });
  ObjectModel.belongsTo(Collection, { foreignKey: "collectionId", as: "collection" });

  Person.hasMany(Loan, { foreignKey: "personId", as: "loans" });
  Loan.belongsTo(Person, { foreignKey: "personId", as: "person" });

  ObjectModel.hasMany(Loan, { foreignKey: "objectId", as: "loans" });
  Loan.belongsTo(ObjectModel, { foreignKey: "objectId", as: "object" });

  User.belongsToMany(Collection, {
    through: CollectionManager,
    foreignKey: "userId",
    otherKey: "collectionId",
    as: "managedCollections",
  });
  Collection.belongsToMany(User, {
    through: CollectionManager,
    foreignKey: "collectionId",
    otherKey: "userId",
    as: "managers",
  });
  CollectionManager.belongsTo(User, { foreignKey: "userId", as: "user" });
  CollectionManager.belongsTo(Collection, { foreignKey: "collectionId", as: "collection" });
  User.hasMany(CollectionManager, { foreignKey: "userId", as: "collectionManagerLinks" });
  Collection.hasMany(CollectionManager, { foreignKey: "collectionId", as: "collectionManagerLinks" });

  await sequelize.sync();
};

export default setupAssociations;
