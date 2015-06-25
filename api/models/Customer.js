/**
* Customer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
	migrate: 'alter',
  attributes: {
	//_title: 'Cliente',
	id: {
		//columnName: 'matnr',
		//description: 'Código',
		type: "integer",
		max: 999999,
		min: 100,
		primaryKey: true,
		required: true,
		unique: true
	},
	name: {
		//description: 'Nombre',
		type: 'string',
		required: true,
		maxLength: 35
	},
	status: {
		//description: 'status',
		type: 'string',
		enum: ['A', 'I']
		//,enumdes: ['Activo', 'Inactivo']
	},
	
  }
};

