/**
* Paciente.js
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
	history: {
		//description: 'No.Historia',
		type: "string"
	},
	name: {
		//description: 'Nombre',
		type: "string",
		required: true
	},
	born: {
		//description: 'Nacimiento',
		type: "date",
		required: true
	},
	gender: {
		//description: 'Sexo',
		type: 'string',
		enum: ['m', 'f']
		//,enumdes: ['Male', 'Female']
	},
	ocuppation: {
		//description: 'Profesión',
		type: 'string'
	}
//End Attributes
  }
};

