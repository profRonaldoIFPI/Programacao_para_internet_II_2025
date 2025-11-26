import ObjectModel from "./object.model.js";

export const createObject = (data) => ObjectModel.create(data);

export const findAllObjects = () => ObjectModel.findAll();

export const findObjectById = (id) => ObjectModel.findByPk(id);

export const updateObject = (id, data) => ObjectModel.update(data, { where: { id } });

export const deleteObject = (id) => ObjectModel.destroy({ where: { id } });
