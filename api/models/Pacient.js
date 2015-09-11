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
		//description: 'History.No',
		type: "string"
	},
	personalId: {
		//description: 'Personal ID',
		type: "string"	
	},
	name: {
		//description: 'Name',
		type: "string",
		required: true
	},
	born: {
		//description: 'Born',
		type: "date",
		required: true
	},
	gender: {
		//description: 'Gender',
		type: 'string',
		enum: ['m', 'f']
		//,enumdes: ['Male', 'Female']
	},
	ocuppation: {
		//description: 'Ocupation',
		type: 'string'
	},
	phone: {
		//description: 'Phone(s)',
		type: 'string'
	},
	email: {
		//description: 'email',
		type: 'string'
	},
	insurance: {
		//description: 'Insurance',
		type: 'string'
	},
	Notes: {
		//description: 'Notes',
		type: 'string'
	}
//End Attributes
  }
};

