/**
* ExpenseCategory.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	//migrate:"alter",
  attributes: {
	//_card_width: '60em',
	//_btn_left: '30px',
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
	name: {
		//description: "Category",
		type:'string',
		required: true
	}
//End Attributes
  }
};

