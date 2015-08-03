/**
* Model.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  migrate: 'alter',

  attributes: {
	//_title: 'Modelo',
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	name: {
		//description: 'Name',
		type: 'string',
		required: true
	},
	title: {
		//description: 'Title',
		type: 'string',
		required: true
	},
	primaryKey: {
		//description: 'Primary Key',
		//key: id,
		//key_type: 'integer',
		//display: 'attribute',
		//type: 'string',
		model: 'Attribute'
	},
	AutoIncrement: {
		//description: 'Auto Increment',
		type: 'boolean',
		enum: [true, false]
		//,enumdes: ['Yes', 'No']
	}
  }
};

