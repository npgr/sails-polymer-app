/**
* Customer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
	//migrate: 'alter',
  attributes: {
	//_title: 'Cliente',
	id: {
		//columnName: 'matnr',
		//description: 'id',
		type: "integer",
		//no_max: 999999,
		//no_min: 100,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	code: {
		//description: 'Code',
		type: 'string'
	},
	name: {
		//description: 'Nombre',
		type: 'string',
		required: true
		//,no_maxLength: 35
	},
	balance: {
		//description: 'Balance',
		type: 'float'
	},
	creditLimit: {
		//description: 'Credit',
		type: 'float'
	},
	city: {
		//description: 'Ciudad',
		type: 'string',
		required: true,
		maxLength: 25
	},
	address: {
		//description: 'Dirección',
		//hide: true,
		type: 'string'
	},
	status: {
		//description: 'Status',
		type: 'string',
		enum: ['A', 'I', 'B']
		//,enumdes: ['Activo', 'Inactivo', 'Bloqueado']
	}
//End Attributes	
  }
};

