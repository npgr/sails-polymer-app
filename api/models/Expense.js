/**
* Expense.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	//migrate: "alter",
  attributes: {
	//_ga: 'enabled',
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	user: {
		//description: 'User',
		//key: id,
		//key_type: 'integer',
		//display: 'usr',
		//type: 'string',
		//omit: true,
		model: 'User'
	},
	date: {
		//description: 'Date',
		type:'date',
		required: true
	},
	category: {
		//description: 'Category',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'ExpenseCategory',
		required: true
	},
	description: {
		//description: 'Description',
		type:'string'
	},
	amount: {
		//description: 'Amount',
		type:'float',
		required: true
	}
//End Attributes
  }
};

