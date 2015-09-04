/**
* City.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	migrate: "alter",
  attributes: {
	//_title: 'City',
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
	name: {
		//description: 'Name',
		type: 'string',
		required: true
	}
//End Attributes
  }
};

