/**
* FunctionList.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
	//migrate: 'alter',
	
  attributes: {
	
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
	new: {
		//description: 'New',
		type: 'string',
		enum: ['e','d']
		//,enumdes: ["Enabled","Disabled"]
	},
	display: {
		//description: 'Display',
		type: 'string',
		enum: ['e','d']
		//,enumdes: ["Enabled","Disabled"]
	},
	edit: {
		//description: 'Edit',
		type: 'string',
		enum: ['e','d']
		//,enumdes: ["Enabled","Disabled"]
	},
	delete: {
		//description: 'Delete',
		type: 'string',
		enum: ['e','d']
		//,enumdes: ["Enabled","Disabled"]
	},
	columns: {
		//description: 'Columns',
		type: 'string',
		enum: ['e','d']
		//,enumdes: ["Enabled","Disabled"]
	},
	download: {
		//description: 'Download',
		type: 'string',
		enum: ['e','d']
		//,enumdes: ["Enabled","Disabled"]
	},
	print: {
		//description: 'Print',
		type: 'string',
		enum: ['e','d']
		//,enumdes: ["Enabled","Disabled"]
	},
	ga: {
		//description: 'Google Analytics',
		type: 'string',
		enum: ['e','d']
		//,enumdes: ["Enabled","Disabled"]
	},
	dialog_width: {
		//description: 'Dialog Width',
		type: 'string',
	},
	card_width: {
		//description: 'Card Width',
		type: 'string',
	},
	btn_left: {
		//description: 'Button Left',
		type: 'string',
	}
//End Attributes
  }
};

