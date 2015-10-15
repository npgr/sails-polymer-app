/**
* OrderDetail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
	//migrate: 'alter',
  attributes: {
	//_title: 'Order Detail',
	//_columns: 'disabled',
	//_ga: 'enabled',
	//_unique: ['order', 'product'],
	id: {
		//description: 'Id',
		//hide: true,
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	order: {
		//description: 'Order',
		//hide: true,
		type: 'integer',
		required: true
	},
	product: {
		//description: 'Product',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Product',
		required: true
	},
	quantity: {
		//description: 'Quantity',
		type: 'integer',
		required: true
	},
	price: {
		//description: 'Price',
		type: 'float'
	},
	discount: {
		//description: 'Discount',
		type: 'float'
	}
//End Attributes
  }
};

