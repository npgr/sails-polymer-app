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
		//no_max: 999999,
		//no_min: 100,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	name: {
		//description: 'Nombre',
		type: 'string',
		required: true
		//,no_maxLength: 35
	},
	city: {
		//description: 'Ciudad',
		type: 'string',
		required: true,
		maxLength: 25
	},
	Address: {
		//description: 'Dirección',
		//hide: true,
		type: 'string'
	},
	status: {
		//description: 'status',
		type: 'string',
		enum: ['A', 'I']
		//,enumdes: ['Activo', 'Inactivo']
	},
	
  }
};

