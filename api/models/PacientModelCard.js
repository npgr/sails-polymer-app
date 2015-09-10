/**
* PacientModelCard.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	name: {
		//description: 'Nombre',
		type: "string",
		required: true
	},
	predefined: {
		//description: 'Nombre',
		type: "string",
	}
  }
};

