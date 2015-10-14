/**
* Paciente.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	migrate: 'alter',

  attributes: {
	//_ga: 'enabled',
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	user: {
		//description: 'user',
		//key: id,
		//key_type: 'integer',
		//display: 'usr',
		//type: 'string',
		model: 'User'
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
		//hide: true,
		type: 'string'
	},
	email: {
		//description: 'email',
		//hide: true,
		type: 'string'
	},
	insurance: {
		//description: 'Insurance',
		//hide: true,
		type: 'string'
	},
	Notes: {
		//description: 'Notes',
		type: 'string'
	}
//End Attributes
  }
};

