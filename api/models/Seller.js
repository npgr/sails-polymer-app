/**
* Seller.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  //migrate: 'alter',
  attributes: {
	//_title: 'Seller',
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
	user: {
		//description: 'User',
		//key: id,
		//key_type: 'integer',
		//display: 'usr',
		//type: 'string',
		model: 'User'
	}
//End Attributes
  }
};

