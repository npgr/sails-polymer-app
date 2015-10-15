/**
* PacientCard.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	//migrate: 'alter',
  attributes: {
	//_card_width: '60em',
	//_btn_left: '30px',
	//_ga: 'enabled',
	//_columns: 'disabled',
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
		//hide: true,
		model: 'Pacient',
		required: true
	},
	No: {
		//description: 'No',
		type: 'integer'
	},
	question: {
		//description: 'Question',
		type: 'string',
		required: true
	},
	answer: {
		//description: 'Answer',
		type: 'string',
		required: true
	}
//End Attributes
  }
};

