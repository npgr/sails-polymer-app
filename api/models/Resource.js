/**
* Resource.js
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
	name: {
		//description: "Name",
		type:'string',
		required: true
	},
	type: {
		//description: 'Type',
		type: "string",
		enum: ["page","api","option"]
		//,enumdes: ["Page", "Api", "Option"]
	}
//End Attributes
  }
};

