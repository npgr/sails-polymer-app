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
		type: 'integer',
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	pos: {
		//description: 'Pos',
		type: 'integer'
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
		type: "string",
		required: true
	},
	description: {
		//description: 'Description',
		type: "string",
		required: true
	},
	type: {
		//description: 'Type',
		type: 'string',
		enum: ['integer', 'string', 'float', 'date', 'boolean']
		//,enumdes: ['integer', 'string', 'float', 'date', 'boolean']
	},
	required: {
		//description: 'Required',
		type: 'boolean',
		enum: [true, false]
		//,enumdes: ['Yes', 'No']
	},
	enum: {
		//description: 'Enum',
		type: 'string'
	},
	ref_model: {
		//description: 'Reference Model',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Model'
	},
	key: {
		//description: 'Key',
		//hide: true,
		type: 'string'
	},
	key_type: {
		//description: 'Key Type',
		//hide: true,
		type: 'string',
		enum: ['integer', 'string', 'float', 'date', 'boolean']
		//,enumdes: ['integer', 'string', 'float', 'date', 'boolean']
	},
	model_display: {
		//description: 'Display #',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		//hide: true,
		model: 'Attribute'
	},
	top_label: {
		//description: 'Top Label #',
		//hide: true,
		type: 'string',
		required: true
	},
	left_label: {
		//description: 'Left Label #',
		//hide: true,
		type: 'string',
		required: true
	},
	not_filter: {
		//description: 'Not Filter #',
		type: 'boolean',
		enum: [true, false]
		//,enumdes: ['Yes', 'No']
	},
	display: {
		//description: 'Display #',
		type: 'string',
		enum: ['s', 'h']
		//,enumdes: ['Show', 'Hide']
	},
	create: {
		//description: 'Create #',
		type: 'string',
		enum: ['c', 'r', 'h']
		//,enumdes: ['Create', 'Readonly', 'Hide']
	},
	update: {
		//description: 'Update #',
		type: 'string',
		enum: ['u', 'r', 'h']
		//,enumdes: ['Update', 'Readonly', 'Hide']
	},
	delete: {
		//description: 'Delete #',
		type: 'string',
		enum: ['s', 'h']
		//,enumdes: ['Show', 'Hide']
	},
	help: {
		//description: 'Help #',
		type: 'string'
	}
  }
};

