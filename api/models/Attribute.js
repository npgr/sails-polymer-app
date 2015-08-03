/**
* Attribute.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  migrate: 'alter',

  attributes: {
	model: {
		//description: 'Model',
		primaryKey: true,
		unique: false,
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Model'
	},
	attribute: {
		//description: 'Attribute',
		type: "string",
		primaryKey: true,
		unique: false
	},
	type: {
		//description: 'Type',
		type: 'string',
		enum: ['integer', 'string', 'float', 'date']
		//,enumdes: ['integer', 'string', 'float', 'date']
	},
	primaryKey: {
		//description: 'PrimaryKey',
		type: 'boolean',
		enum: [true, false]
		//,enumdes: ['true', 'false']
	},
	required: {
		//description: 'Required',
		type: 'boolean',
		enum: [true, false]
		//,enumdes: ['true', 'false']
	}
  }
};

