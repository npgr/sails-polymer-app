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
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	customer: {
		//description: 'Customer',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Customer',
		required: true
	},
	Seller: {
		//description: 'Seller',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Seller',
		required: true
	},
	date: {
		//description: 'Fecha',
		type: 'date'
	},
	amount: {
		//description: 'Amount',
		type: 'Float'
	},
	products: {
		//description: 'Products',
		type: 'integer'
	},
	units: {
		//description: 'Units',
		type: 'integer'
	},
	status: {
		//description: 'Status',
		type: 'string',
		enum: ['1','2','3','4']
		//,enumdes: ['Capturing', 'Processing', 'Delivering', 'Delivered']
	}
//End Attributes
  }
};

