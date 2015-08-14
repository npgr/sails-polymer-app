/**
* OrderDetail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
	//migrate: 'alter',
  attributes: {
	//_title:'Detalle Pedido',
	//_unique: ['order', 'product'],
	id: {
		//description: 'Id',
		//hide: true,
		type: "integer",
		max: 9999999,
		min: 1,
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	order: {
		//description: 'Pedido',
		type: 'integer'
	},
	product: {
		//description: 'Producto',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Product',
		required: true
	},
	quantity: {
		//description: 'Cantidad',
		type: 'integer'
	}
  }
//End Attributes
};

