/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	//migrate: 'alter',
  attributes: {
	//_title: 'Pedido',
	id: {
		//description: 'Pedido',
		type: "integer",
		max: 999999,
		min: 1,
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	customer: {
		//description: 'Cliente',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Customer',
		required: true
	},
	date: {
		//description: 'Fecha',
		type: 'date',
		required: true
	},
	amount: {
		//description: 'Amount',
		type: 'Float'
	},
	status: {
		//description: 'Status',
		type: 'string',
		enum: ['1','2','3']
		//,enumdes: ['En Captura', 'En Despacho', 'Despachado']
	}
//End Attributes
  }
};

