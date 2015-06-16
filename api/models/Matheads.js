/**
* Matheads.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	//migrate: 'alter',
	
  attributes: {
	//_title: 'Material - MATHEADS',
	matnr: {
		columnName: 'matnr',
		//description: 'Número Material',
		type: "integer",
		max: 999999,
		min: 10,
		primaryKey: true,
		required: true,
		unique: true
	},
	matl_type: {
		//description: 'Tipo de Material',
		type: 'string',
		enum: ['ZMED', 'ZMIS']
		//,enumdes: ['ZMED - MEDICINAS', 'ZMIS - MISCELANEOS']
	},
	matl_group: {
		//description: 'Grupo de Material',
		type: 'string',
		required: true,
		maxLength: 4
	},
	matl_cat: {
		//description: 'Categoria de Material',
		type: 'string',
		defaultsTo: '00'
	}
  }
};

