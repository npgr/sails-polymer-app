/**
* PacientCard.js
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
	pacient: {
		//description: 'Pacient',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Pacient',
		required: true
	},
	question: {
		//description: 'Question',
		type: 'string'
		required: true
	},
	answer: {
		//description: 'Aswer',
		type: 'string',
		required: true
	}
//End Attributes
  }
};

