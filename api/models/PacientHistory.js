/**
* PacientHistory.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	migrate: 'alter',
  attributes: {
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	pacient: {
		//description: 'Pacient',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Pacient',
		required: true
	},
	date: {
		//description: 'Date',
		type: 'date',
		required: true
	},
	type: {
		//description: "Type",
		type: 'string',
		enum: ['c', 's']
		//,enumdes: ["Cita","Consulta"]
	},
	diagnosis: {
		//description: "Diagnosis",
		type: 'string'
	},
	recipe: {
		//description: "Recipe",
		type: 'string'
	}
//End Attributes
  }
};
