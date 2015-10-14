/**
* Country.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	//migrate: "alter",
  attributes: {
	//_card_width: '60em',
	//_btn_left: '30px',
	//_ga: 'enabled',
	id: {
		//description: 'id',
		type: "integer",
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	code: {
		//description: 'Code',
		type: 'string'
	},
	name: {
		//description: 'Name',
		type: 'string',
		required: true
	}
//End Attributes
  }
};

