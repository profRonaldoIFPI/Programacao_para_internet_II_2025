import CollectionManager from "./collectionManager.model.js";

export const createManager = (data) => CollectionManager.create(data);

export const findManagers = (collectionId) => {
  if (collectionId) {
    return CollectionManager.findAll({ where: { collectionId } });
  }
  return CollectionManager.findAll();
};

export const findManagerById = (id) => CollectionManager.findByPk(id);

export const updateManager = (id, data) => CollectionManager.update(data, { where: { id } });

export const deleteManager = (id) => CollectionManager.destroy({ where: { id } });
