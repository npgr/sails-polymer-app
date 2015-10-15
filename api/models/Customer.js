/**
* Customer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
	//migrate: 'alter',
  attributes: {
	//_title: 'Customer',
	//_dialog_width: '38em',
	//_ga: 'enabled',
	id: {
		//description: 'id',
		type: "integer",
		primaryKey: true,
		unique: true,
		autoIncrement: true
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
		model: 'CustomerCategory',
		required: true
	},
	salesregion: {
		//description: 'Region',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'SalesRegion',
		required: true
	},
	taxid: {
		//description: 'Tax Id',
		type: 'string'
	},
	creditlimit: {
		//description: 'Credit Limit',
		type: 'float'
	},
	balance: {
		//description: 'Balance',
		type: 'float'
	},
	country: {
		//description: 'Country',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Country',
		required: true
	},
	state: {
		//description: 'State',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'State'
	},
	city: {
		//description: 'City',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'City'
	},
	address: {
		//description: 'Address',
		//hide: true,
		//textarea_cols: 50,
		//textarea_rows: 4,
		type: 'string'
	},
	phone: {
		//description: 'Phone',
		type: 'string'
	},
	email: {
		//description: 'Email',
		type: 'string'
	},
	notes: {
		//description: 'Notes',
		//textarea_cols: 50,
		//textarea_rows: 4,
		type: 'string'
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

