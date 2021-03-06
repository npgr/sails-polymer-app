/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	//migrate: 'alter',

  attributes: {
	//_title: 'Product',
	//_ga: 'enabled',
	id: {
		//description: 'Id',
		type: "integer",
		max: 999999,
		min: 1,
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	code: {
		//description: 'Code',
		type: 'string'
	},
	name: {
		//description: 'Name',
		type: 'string',
		required: true
	},
	category: {
		//description: 'Category',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'ProductCategory',
		required: true
	},
	subCategory: {
		//description: 'SubCategory',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'ProductSubCategory'
	},
	supplier: {
		//description: 'Supplier',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Supplier'
	},
	suppliercode: {
		//description: 'Supplier Code',
		//hide: true,
		type: 'string'
	},
	stock: {
		//description: 'Stock',
		type: 'integer'
	},
	upc: {
		//description: 'UPC',
		//hide: true,
		type: 'integer'
	},
	price: {
		//description: 'Price',
		//hide: true,
		type: 'float'
	},
	cost: {
		//description: 'Cost',
		//hide: true,
		type: 'float'
	},
	photo: {
		//description: 'Photo',
		//hide: true,
		type: 'string',
	},
	status: {
		//description: 'Status',
		type: 'string',
		enum: ['a', 'i']
		//,enumdes: ['Active', 'Inactive']
	}
//End Attributes
  }
};

