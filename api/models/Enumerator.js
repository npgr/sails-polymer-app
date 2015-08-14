/**
* Enumerator.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

	//migrate: 'alter',
	
	
  attributes: {
	//_title: 'Enumerador',
  
	model: {
		//description: 'Entidad',
		type: 'string',
		primaryKey: true,
		required: true,
		unique: true
	},
	last: {
		//description: 'Ultimo',
		type: 'integer'
	}
  }
};

