 /**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	migrate: "alter",
  attributes: {
	//_title: 'Categoria',
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		//description: 'Nombre',
		type: "string",
		required: true
	}
  }
};