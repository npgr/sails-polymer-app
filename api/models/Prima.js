/**
* Prima.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	//migrate: 'alter',
  attributes: {
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	region: {
		type: "string",
		enum: ["L","W"]
		//,enumdes: ["Latinamerica", "Worldwide"]
	},
	coverage: {
		//description: 'Cobertura',
		type: "string",
		enum: ["1","2"]
		//,enumdes: ["$7000000", "$9000000"]
	},
	type: {
		type: "string",
		enum: ["I","F"]
		//,enumdes: ["Individual", "Familiar"]
	},
	age: {
		//description: 'Age',
		type: 'integer',
		required: true
	},
	p1: {
		//description: 'Prima 1',
		type: 'integer',
		required: true
	},
	p2: {
		//description: 'Prima 2',
		type: 'integer',
		required: true
	},
	p3: {
		//description: 'Prima 3',
		type: 'integer',
		required: true
	},
	p4: {
		//description: 'Prima 4',
		type: 'integer',
		required: true
	},
	p5: {
		//description: 'Prima 5',
		type: 'integer',
		required: true
	},
	p6: {
		//description: 'Prima 6',
		type: 'integer',
		required: true
	}
//End Attributes
  }
};

