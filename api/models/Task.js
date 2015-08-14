/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	//migrate: "alter",
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
	type: {
		//description: 'Tipo',
		type: "string",
		enum: ["i","t","c","p"]
		//,enumdes: ["incidente", "tarea", "cambio", "proyecto"]
	},
	status: {
		//description: 'Status',
		type: "string",
		enum: ["p", "e", "s", "c", "x"]
		//,enumdes: ["Pendiente", "En curso", "Stand by", "Certificacion", "Cerrado"]
	},
	parent: {
		//description: 'Parent',
		//key: id,
		//key_type: 'integer',
		//display: 'activity',
		//type: 'string',
		model: 'Task'
	},
	prioridad: {
		//description: 'Prioridad',
		type: "string",
		enum: ["b", "m", "a", "c"]
		//,enumdes: ["Baja", "Media", "Alta", "Critica"]
	},
	requester: {
		//description: 'Solicitante',
		type: "string",
		required: true
	},
	requestd: {
		//description: 'Solicitud',
		type: "date",
		required: true
	},
	start: {
		//description: 'Inicio',
		type: "date"
	},
	fcompromiso: {
		//description: 'Compromiso',
		type: "date"
	},
	end: {
		//description: 'Fin',
		//hide: true,
		type: "date"
	},
	responsable: {
		//description: 'Responsable',
		type: "string"
	},
	ultseguimiento: {
		//description: 'Ult Seg',
		//hide: true,
		type: "date"
	}, 
	proxseguimiento: {
		//description: 'Prox Seg',
		//hide: true,
		type: "date"
	},
	observacion: {
		//description: 'observacion',
		type: "string"
	}
//End Attributes
  }
};

