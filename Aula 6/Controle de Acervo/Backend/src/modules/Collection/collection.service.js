import Collection from "./collection.model.js";

export const createCollection = (data) => Collection.create(data);

export const findAllCollections = () => Collection.findAll();

export const findCollectionById = (id) => Collection.findByPk(id);

export const updateCollection = (id, data) => Collection.update(data, { where: { id } });

export const deleteCollection = (id) => Collection.destroy({ where: { id } });
