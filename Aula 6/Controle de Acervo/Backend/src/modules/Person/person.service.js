import Person from "./person.model.js";

export const createPerson = (data) => Person.create(data);

export const findAllPeople = () => Person.findAll();

export const findPersonById = (id) => Person.findByPk(id);

export const updatePerson = (id, data) => Person.update(data, { where: { id } });

export const deletePerson = (id) => Person.destroy({ where: { id } });
