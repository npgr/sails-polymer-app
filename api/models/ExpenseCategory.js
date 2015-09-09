/**
* ExpenseCategory.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	//migrate:"alter",
  attributes: {
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
		model: 'User'
	},
	name: {
		//description: "Category",
		type:'string',
		required: true
	}
//End Attributes
  }
};

