/**
* Function.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	migrate: 'alter',
  attributes: {
	//_title: 'Funcion',
	id: {
		//description: 'Id',
		//hide: true,
		type: 'integer',
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
	name: {
		//description: 'Name',
		type: 'string',
		required: true
	},
	type: {
		//description: 'Type',
		type: 'string',
		required: true,
		enum: ['list','display','edit','new','delete','columns','select','download']
		//,enumdes: ['List','Display','Edit','New','Delete','Columns','Select','Download']
	},
	enable: {
		//description: 'Enable',
		type: 'boolean',
		enum: [true,false]
		//,enumdes: ["Yes","No"]
	},
	width: {
		//description: 'Width',
		type: 'integer',
		required: true
	},
	width_unit: {
		//description: 'Unit',
		type: 'string',
		required: true,
		enum: ['px', 'porc', 'em']
		//,enumdes: ['px','porc','em']
	}
  }
//End Attributes
};

