/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	migrate: "alter",
  attributes: {
	//_title: 'Actividad',
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	activity: {
		//description: 'Actividad',
		type: "string",
		required: true
	},
	finicio: {
		//description: 'Inicio',
		type: "date"
	},
	fcompromiso: {
		//description: 'Compromiso',
		type: "date"
	},
	responsable: {
		//description: 'Responsable',
		type: "string"
	},
	proyecto: {
		//description: 'Proyecto',
		type: "string"
	},
	ultseguimiento: {
		//description: 'Ult Seg',
		type: "date"
	}, 
	proxseguimiento: {
		//description: 'Prox Seg',
		type: "date"
	},
	observacion: {
		//description: 'observacion',
		type: "string"
	}
  }
};

