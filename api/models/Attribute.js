/**
* Attribute.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  migrate: 'alter',

  attributes: {
	//_title: 'Atributo',
	//_unique: ['model', 'attribute'],
	id: {
		//description: 'Id',
		//hide: true,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	model: {
		//description: 'Model',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Model'
	},
	attribute: {
		//description: 'Attribute',
		type: "string"
	},
	type: {
		//description: 'Type',
		type: 'string',
		enum: ['integer', 'string', 'float', 'date', 'boolean']
		//,enumdes: ['integer', 'string', 'float', 'date', 'boolean']
	},
	primaryKey: {
		//description: 'PrimaryKey',
		type: 'boolean',
		enum: [true, false]
		//,enumdes: ['Yes', 'No']
	},
	required: {
		//description: 'Required',
		type: 'boolean',
		enum: [true, false]
		//,enumdes: ['Yes', 'No']
	}
  }
};

