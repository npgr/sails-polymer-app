/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	migrate: 'alter',

  attributes: {
	//_title: 'Producto',

	name: {
		//description: 'Nombre',
		type: 'string',
		required: true
	},
	stock: {
		//description: 'Existencia',
		type: 'integer'
	},
	price: {
		//description: 'Precio',
		type: 'float'
	},
	status: {
		//description: 'Status',
		type: 'string',
		enum: ['A', 'B', 'I']
		//,enumdes: ['Activo', 'Bloqueado', 'Inactivo']
	}
  }
};

