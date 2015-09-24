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
	//_card_width: '65em',
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
	salesregion: {
		//description: 'Region',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'SalesRegion',
		required: true
	},
	user: {
		//description: 'User',
		//key: id,
		//key_type: 'integer',
		//display: 'usr',
		//type: 'string',
		model: 'User',
		required: true
	}
//End Attributes
  }
};

